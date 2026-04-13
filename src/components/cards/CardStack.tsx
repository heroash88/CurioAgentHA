import React, { useCallback, useEffect, useMemo, useRef } from 'react';
import { useCardManager } from '../../contexts/CardManagerContext';
import AnimatedCard from './AnimatedCard';
import FallbackCard from './FallbackCard';

const CardStack: React.FC = () => {
  const { cards, dispatch, registry, pauseTimer, resumeTimer } = useCardManager();

  const handleDismiss = useCallback(
    (cardId: string) => {
      // Check if this is a camera card being dismissed by the user
      const card = cards.find(c => c.id === cardId);
      if (card?.type === 'camera') {
        window.dispatchEvent(new CustomEvent('ha-camera-closed'));
      }
      dispatch({
        type: 'SET_ANIMATION_STATE',
        payload: { id: cardId, state: 'exiting' },
      });
      setTimeout(() => {
        dispatch({ type: 'REMOVE_CARD', payload: { id: cardId } });
      }, 300);
    },
    [dispatch, cards],
  );

  const handleInteractionStart = useCallback(
    (cardId: string) => { pauseTimer(cardId); },
    [pauseTimer],
  );

  const handleInteractionEnd = useCallback(
    (cardId: string) => { resumeTimer(cardId); },
    [resumeTimer],
  );

  // Stable per-card callback refs to avoid re-creating closures on every render.
  // This prevents AnimatedCard (React.memo) from re-rendering when cards haven't changed.
  const dismissHandlersRef = useRef<Map<string, () => void>>(new Map());
  const interactionStartHandlersRef = useRef<Map<string, () => void>>(new Map());
  const interactionEndHandlersRef = useRef<Map<string, () => void>>(new Map());

  const getCardCallbacks = useCallback((cardId: string) => {
    if (!dismissHandlersRef.current.has(cardId)) {
      dismissHandlersRef.current.set(cardId, () => handleDismiss(cardId));
    }
    if (!interactionStartHandlersRef.current.has(cardId)) {
      interactionStartHandlersRef.current.set(cardId, () => handleInteractionStart(cardId));
    }
    if (!interactionEndHandlersRef.current.has(cardId)) {
      interactionEndHandlersRef.current.set(cardId, () => handleInteractionEnd(cardId));
    }
    return {
      onDismiss: dismissHandlersRef.current.get(cardId)!,
      onInteractionStart: interactionStartHandlersRef.current.get(cardId)!,
      onInteractionEnd: interactionEndHandlersRef.current.get(cardId)!,
    };
  }, [handleDismiss, handleInteractionStart, handleInteractionEnd]);

  // Clean up stale callback refs when cards are removed
  useEffect(() => {
    const currentIds = new Set(cards.map(c => c.id));
    for (const id of dismissHandlersRef.current.keys()) {
      if (!currentIds.has(id)) {
        dismissHandlersRef.current.delete(id);
        interactionStartHandlersRef.current.delete(id);
        interactionEndHandlersRef.current.delete(id);
      }
    }
  }, [cards]);

  // Split cards: music goes bottom-left, everything else goes to top
  const { topCards, musicCards } = useMemo(() => {
    const music = cards.filter(c => c.type === 'music');
    const top = cards.filter(c => c.type !== 'music');
    return { topCards: top, musicCards: music };
  }, [cards]);

  const renderCard = useCallback((card: typeof cards[0]) => {
    const registration = registry.get(card.type);
    const CardComponent = registration?.component ?? FallbackCard;
    const cbs = getCardCallbacks(card.id);
    return (
      <AnimatedCard
        key={card.id}
        card={card}
        onDismiss={cbs.onDismiss}
        onInteractionStart={cbs.onInteractionStart}
        onInteractionEnd={cbs.onInteractionEnd}
      >
        <CardComponent
          card={card}
          onDismiss={cbs.onDismiss}
          onInteractionStart={cbs.onInteractionStart}
          onInteractionEnd={cbs.onInteractionEnd}
        />
      </AnimatedCard>
    );
  }, [registry, getCardCallbacks]);

  if (cards.length === 0) return null;

  return (
    <>
      {/* All cards except music — pinned to top center */}
      {topCards.length > 0 && (
        <div className="fixed top-4 left-0 right-0 z-50 flex flex-col items-center gap-3 pointer-events-none px-4 mx-auto max-w-[640px]">
          {topCards.map(renderCard)}
        </div>
      )}

      {musicCards.length > 0 && (
        <div className="fixed bottom-5 left-4 z-[55] flex flex-col items-start gap-3 pointer-events-none sm:bottom-6 sm:left-6">
          {musicCards.map(renderCard)}
        </div>
      )}
    </>
  );
};

export default CardStack;
