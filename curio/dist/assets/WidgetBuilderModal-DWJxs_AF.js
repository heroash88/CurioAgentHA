import{r as l,j as e}from"./react-CPkiFScu.js";import{D as Bt}from"./react-resizable-panels-Jg_wyAvZ.js";import{f as _t,C as Ft}from"./CustomWidgetRuntime-qUoDRss-.js";import{Z as ct,$ as ut}from"./main-C2chIEfX.js";import{j as Ut,k as Ot,v as Ve,l as Xe,i as Ht}from"./dashboardPointContext-aLPYlGCV.js";import{c as pt}from"./customLlmRuntime-Y_rIKOOP.js";import{setSecret as Gt}from"./secretStorage-BTIphee0.js";import{X as $t,am as oe,Y as Jt,bV as We,a3 as qt,cw as Kt,b1 as Vt,b2 as Xt,bi as Qt,cp as Zt,_ as Yt,a7 as ea,p as ta,E as Qe,Q as aa,cN as ra,cO as sa,aO as oa,cP as ia,c2 as na,c0 as la,s as da,O as ca,ab as ua,aG as pa,ak as ga,aV as ma,$ as ha}from"./lucide-DtrNBTgJ.js";import"./CardErrorBoundary-BqZLhDOx.js";import"./randomId-suUo7Lgn.js";import"./useMotionProfile-CwWh1W2E.js";import"./dashboardRefresh-BF1K_H3G.js";import"./curioWidgetAppearanceRecipes-CdlsdUZM.js";import"./framer-motion-EOYuYTmb.js";import"./useSyncedDashboardTime-DEV28td_.js";import"./useWidgetPersistentState-Ct0uBZb9.js";import"./genericMcpService-BCB0RAMV.js";import"./integrationSettings-REM01Nss.js";import"./genericMcpStdioTransport-Bfo2WHjH.js";import"./useDashboardWidgetViewportActive-D5gT14TV.js";import"./generatedDashboardWidgetTool-8d2taiP3.js";import"./AiChatOpenUiRenderer-D6RsGVwW.js";import"./generatedSurfaceTargets-BZ_fN_0m.js";import"./voiceSettings-B2_QrlbF.js";import"./desktopBridge-BsSGYho0.js";import"./genai-CI_iRdBW.js";import"./ortWasmConfig-DJLqFQVy.js";const Ee=[{id:"open-meteo-current",label:"Open-Meteo Current Weather",category:"Weather",description:"Current temperature and wind for Seattle. No signup required.",badge:"No API key",docsUrl:"https://open-meteo.com/en/docs",recommendedTemplateIds:["weather-station"],dataSource:{type:"rest",endpoint:"https://api.open-meteo.com/v1/forecast?latitude=47.6062&longitude=-122.3321&current=temperature_2m,wind_speed_10m,weather_code&temperature_unit=fahrenheit&wind_speed_unit=mph",method:"GET",authType:"none",refreshIntervalSeconds:900,responseMapping:{temperature:"current.temperature_2m",condition:"current.wind_speed_10m",updatedAt:"current.time"}},mockData:{temperature:72,condition:"8 mph wind",updatedAt:"2026-05-13T09:00"}},{id:"sportsdb-next-event",label:"TheSportsDB Next Event",category:"Sports",description:"Upcoming team event through TheSportsDB v1 public key.",badge:"Public key",docsUrl:"https://www.thesportsdb.com/documentation",recommendedTemplateIds:["sports-scores"],dataSource:{type:"rest",endpoint:"https://www.thesportsdb.com/api/v1/json/123/eventsnext.php?id=133602",method:"GET",authType:"none",refreshIntervalSeconds:1800,responsePath:"events",responseMapping:{items:""}},mockData:{items:[{idEvent:"1",strEvent:"Arsenal vs Seattle",strStatus:"Scheduled",dateEvent:"2026-05-18"}]}},{id:"jsonplaceholder-posts",label:"JSONPlaceholder Posts",category:"Testing",description:"Fake posts for fast layout experiments.",badge:"No API key",docsUrl:"https://jsonplaceholder.typicode.com/",recommendedTemplateIds:["social-feed-counter"],dataSource:{type:"rest",endpoint:"https://jsonplaceholder.typicode.com/posts?_limit=5",method:"GET",authType:"none",refreshIntervalSeconds:0,responseMapping:{items:""}},mockData:{items:[{id:1,title:"First prototype post",body:"A fake REST payload."},{id:2,title:"Second prototype post",body:"Useful for widget lists."}]}},{id:"dummyjson-products",label:"DummyJSON Products",category:"Testing",description:"Product cards with names, prices, ratings, and categories.",badge:"No API key",docsUrl:"https://dummyjson.com/docs",recommendedTemplateIds:["api-status-monitor"],dataSource:{type:"rest",endpoint:"https://dummyjson.com/products?limit=5&select=title,price,rating,category,brand",method:"GET",authType:"none",refreshIntervalSeconds:0,responseMapping:{items:"products"}},mockData:{items:[{id:1,title:"Essence Mascara Lash Princess",price:9.99,category:"beauty"},{id:2,title:"Eyeshadow Palette",price:19.99,category:"beauty"}]}},{id:"rest-countries-japan",label:"REST Countries Lookup",category:"Public Data",description:"Country facts for Japan using a field-filtered response.",badge:"No API key",docsUrl:"https://restcountries.com/",recommendedTemplateIds:["api-status-monitor"],dataSource:{type:"rest",endpoint:"https://restcountries.com/v3.1/name/japan?fields=name,capital,population,region,flag",method:"GET",authType:"none",refreshIntervalSeconds:86400,responseMapping:{value:"0.population",label:"0.name.common",detail:"0.capital.0"}},mockData:{value:1258e5,label:"Japan",detail:"Tokyo"}},{id:"sunrise-sunset-seattle",label:"Sunrise-Sunset Seattle",category:"Time",description:"Sunrise, sunset, solar noon, and day length for Seattle.",badge:"No API key",docsUrl:"https://sunrise-sunset.org/api",recommendedTemplateIds:["us-holidays","countdown-timer"],dataSource:{type:"rest",endpoint:"https://api.sunrise-sunset.org/json?lat=47.6062&lng=-122.3321&formatted=0&tzid=America/Los_Angeles",method:"GET",authType:"none",refreshIntervalSeconds:86400,responseMapping:{value:"results.sunrise",detail:"results.sunset",label:"status",updatedAt:"results.solar_noon"}},mockData:{value:"2026-05-13T05:33:00-07:00",detail:"2026-05-13T20:39:00-07:00",label:"OK",updatedAt:"2026-05-13T13:06:00-07:00"}},{id:"open-library-search",label:"Open Library Search",category:"Books",description:"Book search results with title and author fields.",badge:"No API key",docsUrl:"https://openlibrary.org/dev/docs/api/search",recommendedTemplateIds:["nasa-apod-viewer","quote-rotator"],dataSource:{type:"rest",endpoint:"https://openlibrary.org/search.json?q=science%20fiction&limit=5&fields=key,title,author_name,first_publish_year",method:"GET",authType:"none",refreshIntervalSeconds:3600,responseMapping:{items:"docs"}},mockData:{items:[{key:"/works/OL1W",title:"Dune",author_name:["Frank Herbert"],first_publish_year:1965},{key:"/works/OL2W",title:"Foundation",author_name:["Isaac Asimov"],first_publish_year:1951}]}},{id:"github-repo-stats",label:"GitHub Repo Stats",category:"Developer",description:"Public repository stars, forks, and update timestamp.",badge:"No API key",docsUrl:"https://docs.github.com/en/rest/repos/repos#get-a-repository",recommendedTemplateIds:["social-feed-counter"],dataSource:{type:"rest",endpoint:"https://api.github.com/repos/openai/openai-node",method:"GET",authType:"none",refreshIntervalSeconds:3600,responseMapping:{count:"stargazers_count",label:"forks_count",updatedAt:"updated_at"}},mockData:{count:12e3,label:"Forks: 1800",updatedAt:"2026-05-13T12:00:00Z"}},{id:"nager-date-us-holidays",label:"Nager.Date Holidays",category:"Calendar",description:"Next public holidays for the United States.",badge:"No API key",docsUrl:"https://date.nager.at/Api",recommendedTemplateIds:["us-holidays","countdown-timer"],dataSource:{type:"rest",endpoint:"https://date.nager.at/api/v3/NextPublicHolidays/US",method:"GET",authType:"none",refreshIntervalSeconds:86400,responseMapping:{items:""}},mockData:{items:[{date:"2026-05-25",localName:"Memorial Day",name:"Memorial Day"},{date:"2026-06-19",localName:"Juneteenth",name:"Juneteenth National Independence Day"}]}},{id:"usgs-earthquakes-hour",label:"USGS Earthquakes",category:"Public Data",description:"Recent GeoJSON earthquake feed summary.",badge:"No API key",docsUrl:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/geojson.php",recommendedTemplateIds:["api-status-monitor"],dataSource:{type:"rest",endpoint:"https://earthquake.usgs.gov/earthquakes/feed/v1.0/summary/all_hour.geojson",method:"GET",authType:"none",refreshIntervalSeconds:300,responseMapping:{value:"metadata.count",detail:"metadata.title",updatedAt:"metadata.generated",items:"features"}},mockData:{value:3,detail:"USGS All Earthquakes, Past Hour",updatedAt:1778688e6,items:[{id:"quake-1",properties:{title:"M 2.1 - 10 km W of Cobb, CA",mag:2.1}}]}},{id:"github-status",label:"GitHub Status",category:"Status",description:"GitHub public component status summary.",badge:"No API key",docsUrl:"https://www.githubstatus.com/api",recommendedTemplateIds:["api-status-monitor"],dataSource:{type:"rest",endpoint:"https://www.githubstatus.com/api/v2/status.json",method:"GET",authType:"none",refreshIntervalSeconds:300,responseMapping:{status:"status.description",latency:"page.updated_at",updatedAt:"page.updated_at"}},mockData:{status:"All Systems Operational",latency:"2026-05-13T12:00:00Z",updatedAt:"2026-05-13T12:00:00Z"}},{id:"nasa-apod",label:"NASA APOD",category:"Space",description:"Astronomy Picture of the Day metadata.",badge:"API key",docsUrl:"https://api.nasa.gov/",setupUrl:"https://api.nasa.gov/",credentialLabel:"NASA API key",recommendedTemplateIds:["nasa-apod-viewer","quote-rotator"],dataSource:{type:"rest",endpoint:"https://api.nasa.gov/planetary/apod?api_key={{API_KEY}}",method:"GET",authType:"api_key",refreshIntervalSeconds:86400,responseMapping:{value:"title",detail:"explanation",label:"date",updatedAt:"date",imageUrl:"url",mediaType:"media_type",copyright:"copyright"}},mockData:{value:"Total Totality",detail:"Baily's beads and solar prominences captured during the April 2024 total solar eclipse.",label:"2024-04-12",updatedAt:"2024-04-12",imageUrl:"https://apod.nasa.gov/apod/image/2404/image0tseKorona_1100.jpg",mediaType:"image",copyright:"Daniel Korona / NASA APOD"}},{id:"alpha-vantage-global-quote",label:"Alpha Vantage Quote",category:"Finance",description:"Stock quote data for IBM with a free Alpha Vantage key.",badge:"API key",docsUrl:"https://www.alphavantage.co/documentation/",setupUrl:"https://www.alphavantage.co/support/#api-key",credentialLabel:"Alpha Vantage API key",recommendedTemplateIds:["stock-ticker"],dataSource:{type:"rest",endpoint:"https://www.alphavantage.co/query?function=GLOBAL_QUOTE&symbol=IBM&apikey={{API_KEY}}",method:"GET",authType:"api_key",refreshIntervalSeconds:300,responsePath:"Global Quote",responseMapping:{price:"05. price",change:"10. change percent"}},mockData:{price:"182.44",change:"+1.20%"}},{id:"openweather-current",label:"OpenWeather Current Weather",category:"Weather",description:"Current weather data by latitude and longitude.",badge:"API key",docsUrl:"https://openweathermap.org/api/current",setupUrl:"https://home.openweathermap.org/api_keys",credentialLabel:"OpenWeather API key",recommendedTemplateIds:["weather-station"],dataSource:{type:"rest",endpoint:"https://api.openweathermap.org/data/2.5/weather?lat=47.6062&lon=-122.3321&units=imperial&appid={{API_KEY}}",method:"GET",authType:"api_key",refreshIntervalSeconds:900,responseMapping:{temperature:"main.temp",condition:"weather.0.description",updatedAt:"dt"}},mockData:{temperature:72,condition:"clear sky",updatedAt:1778688e3}},{id:"finnhub-quote",label:"Finnhub Quote",category:"Finance",description:"AAPL quote data using a Finnhub token.",badge:"API key",docsUrl:"https://finnhub.io/docs/api/quote",setupUrl:"https://finnhub.io/register",credentialLabel:"Finnhub API token",recommendedTemplateIds:["stock-ticker"],dataSource:{type:"rest",endpoint:"https://finnhub.io/api/v1/quote?symbol=AAPL&token={{API_KEY}}",method:"GET",authType:"api_key",refreshIntervalSeconds:300,responseMapping:{price:"c",change:"dp",updatedAt:"t"}},mockData:{price:198.42,change:1.18,updatedAt:1778688e3}}],de=a=>Ee.find(r=>r.id===a),ba=()=>Array.from(new Set(Ee.map(a=>a.category))).sort((a,r)=>a.localeCompare(r)),xa=a=>JSON.parse(JSON.stringify(a)),ya=["Activity","AlertCircle","AlertTriangle","Archive","ArrowDown","ArrowLeft","ArrowRight","ArrowUp","Bell","BookOpen","Bookmark","Calendar","Check","CheckCircle","CheckCircle2","ChevronDown","ChevronLeft","ChevronRight","Circle","CircleCheck","CirclePlus","CircleX","Clock","Cloud","Code2","Cpu","Database","Delete","DollarSign","Edit3","ExternalLink","FileText","Flag","Flame","Footprints","Gauge","Globe2","Heart","Home","Image","ImageIcon","ImagePlus","Info","Lightbulb","List","ListChecks","Mail","MapPin","MessageCircle","Minus","Music","Newspaper","Palette","Pencil","Pin","PinOff","Plus","PlusCircle","Quote","RefreshCcw","Server","Settings","Shield","SlidersHorizontal","Sparkles","Square","Star","StickyNote","Sun","Tag","Thermometer","Timer","TrendingUp","Trophy","Trash","Trash2","Upload","Users","Wifi","X","XCircle","Zap","Add","Checkmark","DeleteIcon","PlusIcon","Reload","Remove","TrashIcon"],M=a=>{const r=de(a);if(!r)throw new Error(`Missing widget data source preset: ${a}`);return xa(r.dataSource)},L=(a,r,i)=>`function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  const theme = useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const value = data?.${r} ?? "--";
  const detail = data?.${i} ?? "Waiting for data";
  const iconMap = {
    Activity, AlertCircle, AlertTriangle, Archive, ArrowDown, ArrowLeft, ArrowRight,
    ArrowUp, Bell, BookOpen, Bookmark, Calendar, Check, CheckCircle, CheckCircle2,
    ChevronDown, ChevronLeft, ChevronRight, Circle, CircleCheck, CirclePlus, CircleX,
    Clock, Cloud, Code2, Cpu, Database, Delete, DollarSign, Edit3, ExternalLink,
    FileText, Flag, Flame, Footprints, Gauge, Globe2, Heart, Home, Image, ImageIcon, ImagePlus, Info,
    Lightbulb, List, ListChecks, Mail, MapPin, MessageCircle, Minus, Music, Newspaper, Palette,
    Pencil, Pin, PinOff, Plus, PlusCircle, Quote, RefreshCcw, Server, Settings, Shield,
    SlidersHorizontal, Sparkles, Square, Star, StickyNote, Sun, Tag, Thermometer, Timer,
    TrendingUp, Trophy, Trash, Trash2, Upload, Users, Wifi, X, XCircle, Zap,
    Add, Checkmark, DeleteIcon, PlusIcon, Reload, Remove, TrashIcon
  };
  const Icon = iconMap[settings.accentIcon || "Sparkles"] || Sparkles;
  const align = settings.alignment === "center" ? "center" : "start";
  const bodyAlign = settings.placement === "center" ? "center" : settings.placement === "bottom" ? "end" : "start";
  const gap = settings.density === "compact" ? "xs" : settings.density === "roomy" ? "lg" : size.isCompact ? "sm" : "md";
  const minRem = settings.textScale === "compact" ? 1.1 : settings.textScale === "large" ? 1.9 : undefined;
  const maxRem = settings.textScale === "compact" ? 2.2 : settings.textScale === "large" ? 5.5 : undefined;
  return (
    <WidgetBody gap={gap} align={bodyAlign}>
      {!size.isCompact && <Icon size={22} className="text-[var(--dashboard-widget-accent,var(--ether-sky))]" aria-hidden />}
      <WidgetHero size={size} align={align} minRem={minRem} maxRem={maxRem} label={settings.title || "${a}"} value={value} caption={detail} />
      {!size.isCompact && <WidgetText variant="caption" tone="muted" align={align} className={theme.onSurfaceVariant}>{data?.updatedAt || "Live data"}</WidgetText>}
      {settings.showFooter !== false && <WidgetFooter><button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">Refresh</button></WidgetFooter>}
    </WidgetBody>
  );
}`,Ze=a=>`function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton variant="list" /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const items = Array.isArray(data?.items) ? data.items : [];
  const iconMap = {
    Activity, AlertCircle, AlertTriangle, Archive, ArrowDown, ArrowLeft, ArrowRight,
    ArrowUp, Bell, BookOpen, Bookmark, Calendar, Check, CheckCircle, CheckCircle2,
    ChevronDown, ChevronLeft, ChevronRight, Circle, CircleCheck, CirclePlus, CircleX,
    Clock, Cloud, Code2, Cpu, Database, Delete, DollarSign, Edit3, ExternalLink,
    FileText, Flag, Flame, Footprints, Gauge, Globe2, Heart, Home, Image, ImageIcon, ImagePlus, Info,
    Lightbulb, List, ListChecks, Mail, MapPin, MessageCircle, Minus, Music, Newspaper, Palette,
    Pencil, Pin, PinOff, Plus, PlusCircle, Quote, RefreshCcw, Server, Settings, Shield,
    SlidersHorizontal, Sparkles, Square, Star, StickyNote, Sun, Tag, Thermometer, Timer,
    TrendingUp, Trophy, Trash, Trash2, Upload, Users, Wifi, X, XCircle, Zap,
    Add, Checkmark, DeleteIcon, PlusIcon, Reload, Remove, TrashIcon
  };
  const Icon = iconMap[settings.accentIcon || "List"] || List;
  const align = settings.alignment === "center" ? "center" : "start";
  const bodyAlign = settings.placement === "center" ? "center" : settings.placement === "bottom" ? "end" : "start";
  const gap = settings.density === "compact" ? "xs" : settings.density === "roomy" ? "lg" : size.isCompact ? "sm" : "md";
  if (items.length === 0) return <WidgetBody><WidgetEmptyState title="No ${a}" description="The data source returned no items." /></WidgetBody>;
  return (
    <WidgetBody gap={gap} align={bodyAlign} scroll={size.isCompact ? "none" : "y"}>
      <div className={align === "center" ? "flex items-center justify-center gap-2 text-center" : "flex items-center gap-2"}>
        {!size.isCompact && <Icon size={18} className="text-[var(--dashboard-widget-accent,var(--ether-sky))]" aria-hidden />}
        <WidgetText variant="label" tone="muted" align={align}>{settings.title || "${a}"}</WidgetText>
      </div>
      <WidgetList
        items={items}
        size={size}
        maxItems={size.isCompact ? 2 : (settings.maxItems || 5)}
        getKey={(item, index) => item.id || item.idEvent || item.key || item.title || index}
        renderItem={(item) => {
          const title = item.title || item.strEvent || item.localName || item.name || item.properties?.title || "Untitled";
          const subtitle = item.subtitle || item.strStatus || item.dateEvent || item.body || item.category || item.author_name?.[0] || item.properties?.place || item.date || "";
          return (
            <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
              <WidgetText variant="body">{title}</WidgetText>
              {subtitle && <WidgetText variant="caption" tone="muted">{subtitle}</WidgetText>}
            </div>
          );
        }}
      />
      {settings.showFooter !== false && <WidgetFooter><button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">Refresh</button></WidgetFooter>}
    </WidgetBody>
  );
}`,va=()=>`function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  const theme = useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  if (!data?.value && !data?.imageUrl) return <WidgetBody><WidgetEmptyState title="No astronomy image" description="The data source returned no APOD item." /></WidgetBody>;
  const title = data?.value || settings.title || "NASA APOD";
  const detail = data?.detail || "Astronomy Picture of the Day";
  const showImage = data?.mediaType !== "video" && data?.imageUrl;
  return (
    <WidgetBody gap={size.isCompact ? "sm" : "md"} scroll={size.isCompact ? "none" : "y"}>
      {showImage && (
        <div className="overflow-hidden rounded-2xl border border-[var(--ether-glass-border)] bg-black/20">
          <img src={data.imageUrl} alt={title} className="h-28 w-full object-cover" />
        </div>
      )}
      <WidgetHero size={size} align={settings.alignment === "center" ? "center" : "start"} label={settings.title || "NASA APOD"} value={title} caption={data?.label || "Today"} />
      {!size.isCompact && <WidgetText variant="caption" tone="muted" className={theme.onSurfaceVariant}>{detail}</WidgetText>}
      {settings.showFooter !== false && <WidgetFooter><button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">Refresh</button></WidgetFooter>}
    </WidgetBody>
  );
}`,fa=()=>`function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  const startingSteps = Number(data?.steps || settings.startingSteps || 4200);
  const goal = Math.max(1, Number(settings.goal || data?.goal || 10000));
  const streak = Number(data?.streak || settings.streak || 4);
  const [steps, setSteps] = useWidgetPersistentState(widget.id, "steps", startingSteps);
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const currentSteps = Math.max(0, Number(steps) || 0);
  const progress = Math.min(100, Math.round((currentSteps / goal) * 100));
  const toneMap = {
    sky: "border-sky-300/30 bg-sky-400/10 text-sky-100",
    mint: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    rose: "border-rose-300/30 bg-rose-400/10 text-rose-100",
    amber: "border-amber-300/30 bg-amber-400/10 text-amber-100",
    violet: "border-violet-300/30 bg-violet-400/10 text-violet-100"
  };
  const shapeMap = {
    soft: "rounded-2xl",
    pill: "rounded-[2rem]",
    sharp: "rounded-xl",
    ticket: "rounded-2xl border-l-4"
  };
  const surfaceMap = {
    glass: "border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)]",
    color: "border",
    outline: "border border-[var(--ether-glass-border)] bg-transparent"
  };
  const toneClass = toneMap[settings.colorTone || "sky"] || toneMap.sky;
  const shapeClass = shapeMap[settings.shapeStyle || "soft"] || shapeMap.soft;
  const surfaceClass = surfaceMap[settings.surfaceStyle || "glass"] || surfaceMap.glass;
  const addSteps = (amount) => setSteps((current) => Math.max(0, Number(current || 0) + amount));
  return (
    <WidgetBody gap={size.isCompact ? "sm" : "md"}>
      <div className={clsx("min-w-0 p-3", shapeClass, surfaceClass, settings.surfaceStyle === "color" && toneClass)}>
        <div className="flex items-center justify-between gap-2">
          <div className="flex min-w-0 items-center gap-2">
            <Footprints size={size.isCompact ? 16 : 20} aria-hidden />
            <WidgetText variant="label" tone="muted">{settings.title || "Running Steps"}</WidgetText>
          </div>
          {!size.isCompact && <span className="rounded-full border border-white/10 bg-white/10 px-2 py-1 text-[10px] font-bold">{progress}%</span>}
        </div>
        <WidgetHero size={size} label="" value={formatNumber(currentSteps)} caption={"Goal " + formatNumber(goal) + " steps"} />
        <div className="mt-3 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-[var(--dashboard-widget-accent,var(--ether-sky))]" style={{ width: progress + "%" }} />
        </div>
        {!size.isCompact && (
          <div className="mt-3 grid grid-cols-2 gap-2">
            <div className="rounded-xl bg-black/15 px-3 py-2">
              <WidgetText variant="caption" tone="muted">Streak</WidgetText>
              <WidgetText variant="body">{streak} days</WidgetText>
            </div>
            <div className="rounded-xl bg-black/15 px-3 py-2">
              <WidgetText variant="caption" tone="muted">Left</WidgetText>
              <WidgetText variant="body">{formatNumber(Math.max(0, goal - currentSteps))}</WidgetText>
            </div>
          </div>
        )}
      </div>
      <WidgetFooter>
        <div className="grid w-full grid-cols-3 gap-2">
          <button type="button" onClick={() => addSteps(500)} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">+500</button>
          <button type="button" onClick={() => addSteps(1000)} className="rounded-xl bg-[var(--ether-control-active-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-control-active-text)]">+1k</button>
          <button type="button" onClick={() => setSteps(0)} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">Reset</button>
        </div>
      </WidgetFooter>
    </WidgetBody>
  );
}`,Sa=()=>`function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  const initialNotes = Array.isArray(data?.items) ? data.items : [
    { id: "n1", title: "Sketch widget idea", priority: "high", done: false },
    { id: "n2", title: "Review dashboard layout", priority: "normal", done: false },
    { id: "n3", title: "Save API links", priority: "low", done: true }
  ];
  const [notes, setNotes] = useWidgetPersistentState(widget.id, "notes", initialNotes);
  const [selectedPriority, setSelectedPriority] = useWidgetPersistentState(widget.id, "selectedPriority", settings.defaultPriority || "normal");
  if (loading) return <WidgetBody><WidgetSkeleton variant="list" /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const priorityMeta = {
    low: { label: "Low", className: "border-sky-300/25 bg-sky-400/10 text-sky-100" },
    normal: { label: "Normal", className: "border-violet-300/25 bg-violet-400/10 text-violet-100" },
    high: { label: "High", className: "border-rose-300/25 bg-rose-400/10 text-rose-100" }
  };
  const addNote = (title) => {
    const text = String(title || "").trim();
    if (!text) return;
    setNotes((current) => [{ id: String(Date.now()), title: text, priority: selectedPriority, done: false }, ...current]);
  };
  const toggleNote = (id) => setNotes((current) => current.map((note) => note.id === id ? { ...note, done: !note.done } : note));
  const deleteNote = (id) => setNotes((current) => current.filter((note) => note.id !== id));
  return (
    <WidgetBody gap={size.isCompact ? "sm" : "md"} scroll={size.isCompact ? "none" : "y"}>
      <div className="flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-2">
          <StickyNote size={size.isCompact ? 16 : 20} className="text-[var(--dashboard-widget-accent,var(--ether-sky))]" aria-hidden />
          <WidgetText variant="label" tone="muted">{settings.title || "Priority Notes"}</WidgetText>
        </div>
        {!size.isCompact && <WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} compact />}
      </div>
      <div className="grid gap-2 sm:grid-cols-[minmax(0,1fr)_8rem]">
        <InlineQuickAdd placeholder="Add note" parser={(input) => input} onSubmit={addNote} compact={size.isCompact} />
        <select
          value={selectedPriority}
          onChange={(event) => setSelectedPriority(event.target.value)}
          className="rounded-xl border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]"
        >
          <option value="low">Low</option>
          <option value="normal">Normal</option>
          <option value="high">High</option>
        </select>
      </div>
      <WidgetList
        items={notes}
        size={size}
        maxItems={size.isCompact ? 2 : (settings.maxItems || 5)}
        getKey={(item) => item.id || item.title}
        renderItem={(item) => {
          const meta = priorityMeta[item.priority] || priorityMeta.normal;
          return (
            <div className={clsx("flex items-center gap-2 rounded-xl border px-3 py-2", meta.className, item.done && "opacity-70")}>
              <button type="button" onClick={() => toggleNote(item.id)} className="rounded-full bg-black/15 p-1" aria-label="Toggle note done">
                {item.done ? <Checkmark size={13} aria-hidden /> : <Circle size={13} aria-hidden />}
              </button>
              <div className="min-w-0 flex-1">
                <WidgetText variant="body">{item.title}</WidgetText>
                {!size.isCompact && <WidgetText variant="caption" tone="muted">{meta.label} priority</WidgetText>}
              </div>
              <WidgetIconButton ariaLabel="Delete note" icon={<Trash2 size={13} />} onClick={() => deleteNote(item.id)} compact />
            </div>
          );
        }}
      />
    </WidgetBody>
  );
}`,N=a=>[{key:"title",label:"Title",type:"text",default:a},{key:"accentIcon",label:"Icon",type:"select",default:"Sparkles",options:ya.map(r=>({label:r,value:r}))},{key:"textScale",label:"Text Size",type:"select",default:"normal",options:[{label:"Compact",value:"compact"},{label:"Normal",value:"normal"},{label:"Large",value:"large"}]},{key:"alignment",label:"Text Alignment",type:"select",default:"start",options:[{label:"Left",value:"start"},{label:"Center",value:"center"}]},{key:"placement",label:"Element Placement",type:"select",default:"start",options:[{label:"Top",value:"start"},{label:"Center",value:"center"},{label:"Bottom",value:"bottom"}]},{key:"density",label:"Density",type:"select",default:"comfortable",options:[{label:"Compact",value:"compact"},{label:"Comfortable",value:"comfortable"},{label:"Roomy",value:"roomy"}]},{key:"colorTone",label:"Color Palette",type:"select",default:"sky",options:[{label:"Sky",value:"sky"},{label:"Mint",value:"mint"},{label:"Rose",value:"rose"},{label:"Amber",value:"amber"},{label:"Violet",value:"violet"}]},{key:"shapeStyle",label:"Shape",type:"select",default:"soft",options:[{label:"Soft",value:"soft"},{label:"Pill",value:"pill"},{label:"Sharp",value:"sharp"},{label:"Ticket",value:"ticket"}]},{key:"surfaceStyle",label:"Surface",type:"select",default:"glass",options:[{label:"Glass",value:"glass"},{label:"Color wash",value:"color"},{label:"Outline",value:"outline"}]},{key:"showFooter",label:"Show Footer",type:"boolean",default:!0},{key:"maxItems",label:"Max Items",type:"number",default:5,min:1,max:12,step:1}],Ye=[{id:"sports-scores",label:"Sports Scores",icon:"Activity",category:"Media",description:"Live scores and game status.",keywords:["sports","scores","games"],defaultSize:"medium",sourceCode:Ze("Scores"),sourcePresetId:"sportsdb-next-event",dataSource:M("sportsdb-next-event"),mockData:{items:[{idEvent:"1",strEvent:"Arsenal vs Seattle",strStatus:"Scheduled",dateEvent:"2026-05-18"}]},settingsSchema:N("Scores"),metadata:{origin:"template",badge:"Template"}},{id:"weather-station",label:"Weather Station",icon:"Cloud",category:"Context",description:"Temperature, condition, and station freshness.",keywords:["weather","temperature","station"],defaultSize:"medium",sourceCode:L("Weather","temperature","condition"),sourcePresetId:"open-meteo-current",dataSource:M("open-meteo-current"),mockData:{temperature:"72 F",condition:"8 mph wind",updatedAt:"Now"},settingsSchema:N("Weather"),metadata:{origin:"template",badge:"Template"}},{id:"stock-ticker",label:"Stock Ticker",icon:"TrendingUp",category:"Media",description:"Ticker price and daily move.",keywords:["stock","ticker","market"],defaultSize:"small",sourceCode:L("Ticker","price","change"),sourcePresetId:"alpha-vantage-global-quote",dataSource:M("alpha-vantage-global-quote"),mockData:{price:"$182.44",change:"+1.2%"},settingsSchema:N("Ticker"),metadata:{origin:"template",badge:"Template"}},{id:"social-feed-counter",label:"Social Feed Counter",icon:"Bell",category:"Communication",description:"Counts followers, mentions, or post activity.",keywords:["social","counter","feed"],defaultSize:"small",sourceCode:L("Social","count","label"),sourcePresetId:"github-repo-stats",dataSource:M("github-repo-stats"),mockData:{count:"12.4K",label:"GitHub stars"},settingsSchema:N("Social"),metadata:{origin:"template",badge:"Template"}},{id:"iot-sensor-display",label:"IoT Sensor Display",icon:"Gauge",category:"Smart Home",description:"Shows live sensor value and status.",keywords:["iot","sensor","device"],defaultSize:"small",sourceCode:L("Sensor","reading","status"),dataSource:{type:"mcp",mcpServerId:"",mcpToolName:"",mcpArgs:{},authType:"oauth",refreshIntervalSeconds:60,responseMapping:{reading:"value",status:"status"}},mockData:{reading:"42%",status:"Nominal"},settingsSchema:N("Sensor"),metadata:{origin:"template",badge:"Template"}},{id:"countdown-timer",label:"Countdown Timer",icon:"Timer",category:"Productivity",description:"Countdown to a configured moment.",keywords:["countdown","timer","date"],defaultSize:"small",sourceCode:L("Countdown","remaining","target"),dataSource:{type:"static",authType:"none",refreshIntervalSeconds:0,staticData:{remaining:"3d 04h",target:"Launch"}},mockData:{remaining:"3d 04h",target:"Launch"},settingsSchema:[{key:"title",label:"Title",type:"text",default:"Countdown"},{key:"target",label:"Target",type:"text",default:"Launch"}],metadata:{origin:"template",badge:"Template"}},{id:"running-steps-tracker",label:"Running Steps Tracker",icon:"Footprints",category:"Health",description:"A colorful step tracker with quick add buttons and local progress.",keywords:["running","steps","fitness","tracker"],defaultSize:"medium",minW:1,minH:1,sourceCode:fa(),dataSource:{type:"static",authType:"none",refreshIntervalSeconds:0,staticData:{steps:4200,goal:1e4,streak:4}},mockData:{steps:4200,goal:1e4,streak:4},settingsSchema:[...N("Running Steps"),{key:"goal",label:"Daily Goal",type:"number",default:1e4,min:1e3,max:5e4,step:500},{key:"startingSteps",label:"Starting Steps",type:"number",default:4200,min:0,max:5e4,step:100},{key:"streak",label:"Streak Days",type:"number",default:4,min:0,max:365,step:1}],metadata:{origin:"template",badge:"Template"}},{id:"priority-notes-board",label:"Priority Notes Board",icon:"StickyNote",category:"Productivity",description:"Add notes with a priority selector, color chips, done toggles, and delete actions.",keywords:["notes","priority","todo","selector"],defaultSize:"medium",minW:1,minH:1,sourceCode:Sa(),dataSource:{type:"static",authType:"none",refreshIntervalSeconds:0,staticData:{items:[{id:"n1",title:"Sketch widget idea",priority:"high",done:!1},{id:"n2",title:"Review dashboard layout",priority:"normal",done:!1},{id:"n3",title:"Save API links",priority:"low",done:!0}]}},mockData:{items:[{id:"n1",title:"Sketch widget idea",priority:"high",done:!1},{id:"n2",title:"Review dashboard layout",priority:"normal",done:!1},{id:"n3",title:"Save API links",priority:"low",done:!0}]},settingsSchema:[...N("Priority Notes"),{key:"defaultPriority",label:"Default Priority",type:"select",default:"normal",options:[{label:"Low",value:"low"},{label:"Normal",value:"normal"},{label:"High",value:"high"}]}],metadata:{origin:"template",badge:"Template"}},{id:"us-holidays",label:"US Holidays",icon:"Calendar",category:"Productivity",description:"Upcoming US public holidays from a no-key REST source.",keywords:["holiday","calendar","public"],defaultSize:"medium",sourceCode:Ze("US Holidays"),sourcePresetId:"nager-date-us-holidays",dataSource:M("nager-date-us-holidays"),mockData:{items:[{date:"2026-05-25",localName:"Memorial Day",name:"Memorial Day"},{date:"2026-06-19",localName:"Juneteenth",name:"Juneteenth National Independence Day"}]},settingsSchema:N("US Holidays"),metadata:{origin:"template",badge:"Template"}},{id:"quote-rotator",label:"Quote Rotator",icon:"Quote",category:"Media",description:"Rotates quote text from static or API data.",keywords:["quote","rotator","text"],defaultSize:"medium",sourceCode:L("Quote","quote","author"),dataSource:{type:"static",authType:"none",refreshIntervalSeconds:0,staticData:{quote:"Stay curious.",author:"Curio"}},mockData:{quote:"Stay curious.",author:"Curio"},settingsSchema:N("Quote"),metadata:{origin:"template",badge:"Template"}},{id:"nasa-apod-viewer",label:"NASA APOD Viewer",icon:"Image",category:"Media",description:"Astronomy Picture of the Day with rendered image preview.",keywords:["nasa","apod","space","image"],defaultSize:"medium",minH:2,sourceCode:va(),sourcePresetId:"nasa-apod",dataSource:M("nasa-apod"),mockData:{value:"Total Totality",detail:"Baily's beads and solar prominences captured during the April 2024 total solar eclipse.",label:"2024-04-12",updatedAt:"2024-04-12",imageUrl:"https://apod.nasa.gov/apod/image/2404/image0tseKorona_1100.jpg",mediaType:"image",copyright:"Daniel Korona / NASA APOD"},settingsSchema:N("NASA APOD"),metadata:{origin:"template",badge:"Template"}},{id:"api-status-monitor",label:"API Status Monitor",icon:"Wifi",category:"System",description:"Monitors endpoint health and response status.",keywords:["api","status","uptime"],defaultSize:"small",sourceCode:L("API Status","status","latency"),sourcePresetId:"github-status",dataSource:M("github-status"),mockData:{status:"Operational",latency:"Updated now"},settingsSchema:N("API Status"),metadata:{origin:"template",badge:"Template"}}],gt=`
You write Curio dashboard custom widgets.
Rules:
1. Return one React functional component named Widget.
2. The component accepts exactly { widget, data, loading, error, settings, onRefresh }.
3. Do not include imports, require, markdown fences, export statements, fetch, window, document, localStorage, eval, Function, globalThis, self, top, parent, frames, navigator, WebSocket, Worker, setTimeout, setInterval, or requestAnimationFrame.
4. Use shared primitives only: WidgetBody, WidgetHero, WidgetStatGrid, WidgetList, WidgetFooter, WidgetContent, WidgetText, FitText, WidgetEmptyState, WidgetSkeleton, WidgetCounter, WidgetIconButton, InlineQuickAdd, WidgetSurface, WidgetMetricTile, WidgetStatusPill, WidgetProgress, WidgetBarChart, WidgetLineChart, WidgetDonutChart, and curated lucide icons from the sandbox.
5. Read remote data only from the data prop. Never fetch inside the widget.
6. Use const size = useWidgetSize(widget) near the top of every component before any helper, filter, dropdown, chart, WidgetContent, WidgetHero, WidgetList, or size.sizeClass access. Never reference size before it is defined.
7. Always handle loading, error, and empty data states.
8. Use useCardTheme() for theme tokens and useMotionProfile() before any animation.
9. Put actions in WidgetFooter. Do not use justify-between on WidgetBody.
10. Avoid text-2xl or larger unless guarded by size.isCompact or size.* checks.
11. Available icons include Plus, PlusIcon, Add, Trash2, TrashIcon, DeleteIcon, Check, Checkmark, CheckCircle, CheckCircle2, Circle, CircleCheck, CirclePlus, PlusCircle, ArrowLeft, ArrowRight, ArrowUp, ArrowDown, Pencil, Edit3, X, Search, Send, RefreshCcw, Reload, Star, Sparkles, BookOpen, FileText, Tag, Calendar, Clock, Cloud, Image, ImageIcon, ExternalLink, Settings, Shield, Wifi, Zap, Footprints, Flame, Flag, Trophy, StickyNote, ListChecks, Palette, Activity, Gauge, Bell, and TrendingUp. Do not invent icon names.
12. If you use InlineQuickAdd, always pass parser={input => input} or a real parser function, and pass onSubmit. For add/delete/toggle interactions that should survive reloads (notes, habits, running steps, trackers, saved filters), use useWidgetPersistentState(widget.id, key, initialValue). Use React useState only for temporary UI such as a selected tab, draft filter, dropdown value, or hover-like control. Remote data still comes only from the data prop.
13. Prefer app-matching visual variety through WidgetSurface, WidgetMetricTile, settings.colorTone, settings.shapeStyle, settings.surfaceStyle, and settings.density when useful. Choose semantic visual settings first, then use subtle translucent panels, chips, progress bars, and borders with theme variables or Tailwind color opacity classes like bg-sky-400/10, not loud full-saturation blocks. Only use a custom color when it comes from user data or an explicit setting.
14. For personal trackers such as running steps, habits, or notes, use useWidgetPersistentState(widget.id, key, initialValue) when the user's edits should survive reloads. For temporary UI controls, use React useState.
15. Build useful widgets, not decorative shells: combine a hero, at least one meaningful secondary detail, and either a list, stat grid, selector, progress bar, or footer action when the request supports it. Hide secondary details in compact sizes.
16. For images from data, render an intrinsic <img> only inside a bounded rounded container, with an alt value from data/settings and a non-image fallback. For clocks/countdowns, use useSyncedDashboardTime instead of timers.
`,mt=`
Blueprint vocabulary:
- Use this vocabulary internally to plan a powerful widget before writing JSX. Do not output the blueprint; return only the final Widget component.
- Shell: WidgetBody, WidgetSurface, WidgetContent, WidgetFooter.
- Hero: WidgetHero, FitText, WidgetCounter.
- Metrics: WidgetStatGrid, WidgetMetricTile, WidgetStatusPill, WidgetProgress.
- Charts: WidgetBarChart(title, labels, values, tone?), WidgetLineChart(title, labels, values, tone?) or WidgetLineChart(title, labels, undefined, [{ name, values, tone }], tone), WidgetDonutChart(title, labels, values, tone?).
- Lists and actions: WidgetList, InlineQuickAdd, WidgetIconButton, select controls, and footer buttons.
- Visual language: surfaceStyle may be glass, solid, ink, tinted, media, scene, or plain; colorTone may be sky, mint, rose, amber, violet, teal, slate, weather, energy, media, security, home, or neutral; density may be compact, comfortable, or spacious.
- For weather, energy, media, security, and home prompts, start from <WidgetSurface surfaceStyle={settings.surfaceStyle || "scene"} colorTone="weather" density={settings.density || "spacious"}> and use WidgetMetricTile for stats instead of hand-drawn nested cards.
- Good widgets combine at least two layers when space allows: hero + metrics, chart + status, list + action, or progress + recent activity.
- Compact widgets should keep one hero or one key status plus one tiny secondary detail. Larger widgets should add charts, list rows, or action controls.
`,ka=`
Example stat hero:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  const theme = useCardTheme();
  const motion = useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const value = data?.value ?? settings.fallbackValue ?? 0;
  return (
    <WidgetBody gap={size.isCompact ? "sm" : "md"}>
      <WidgetHero size={size} label={settings.label || "Metric"} value={<WidgetCounter value={Number(value) || 0} />} caption={data?.status || "Live"} />
      {!size.isCompact && <WidgetFooter right={<WidgetText variant="caption" tone="muted">{motion.shouldAnimate ? "Live" : "Updated"}</WidgetText>} />}
    </WidgetBody>
  );
}

Example weather scene:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const labels = Array.isArray(data?.labels) ? data.labels : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const temperature = Array.isArray(data?.temperature) ? data.temperature : [22, 23, 24, 24, 25];
  const humidity = Array.isArray(data?.humidity) ? data.humidity : [60, 62, 65, 68, 70];
  return (
    <WidgetBody gap="none">
      <WidgetSurface surfaceStyle={settings.surfaceStyle || "scene"} colorTone="weather" density={settings.density || "spacious"}>
        <div className="flex min-w-0 items-start justify-between gap-3">
          <WidgetText variant="label" tone="muted">{settings.title || "Weather Overview"}</WidgetText>
          <WidgetStatusPill label={data?.condition || "Current"} tone="weather" />
        </div>
        <WidgetStatGrid size={size} maxColumns={size.isWide ? 3 : 2}>
          <WidgetMetricTile label="Temperature" value={data?.temperatureNow || "22°C"} detail="Current temperature" tone="weather" />
          <WidgetMetricTile label="Humidity" value={data?.humidityNow || "60%"} detail="Current humidity" tone="teal" />
          <WidgetMetricTile label="Wind" value={data?.wind || "15 km/h"} detail="Current wind speed" tone="slate" />
        </WidgetStatGrid>
        {!size.isCompact && <WidgetLineChart title="Weekly Weather Trends" labels={labels} series={[{ name: "Temperature", values: temperature, tone: "weather" }, { name: "Humidity", values: humidity, tone: "violet" }]} tone="weather" />}
      </WidgetSurface>
    </WidgetBody>
  );
}

Example list with refresh:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton variant="list" /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const items = Array.isArray(data?.items) ? data.items : [];
  if (items.length === 0) return <WidgetBody><WidgetEmptyState title="No items" description="Nothing to show yet." /></WidgetBody>;
  return (
    <WidgetBody scroll={size.isCompact ? "none" : "y"}>
      <WidgetList
        items={items}
        size={size}
        maxItems={size.isCompact ? 2 : 5}
        getKey={(item, index) => item.id || item.title || index}
        renderItem={(item) => (
          <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
            <WidgetText variant="body">{item.title}</WidgetText>
            {item.subtitle && <WidgetText variant="caption" tone="muted">{item.subtitle}</WidgetText>}
          </div>
        )}
      />
      <WidgetFooter><button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">Refresh</button></WidgetFooter>
    </WidgetBody>
  );
}

Example multi-size adaptive:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  const theme = useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" action={<WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />} /></WidgetBody>;
  const metrics = data?.metrics || [];
  return (
    <WidgetBody gap={size.isCompact ? "sm" : "md"}>
      <WidgetText variant="label" tone="muted">{settings.title || "Overview"}</WidgetText>
      <WidgetStatGrid size={size} maxColumns={size.isWide ? 3 : 2}>
        {metrics.map((metric) => (
          <div key={metric.label} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
            <WidgetText variant="caption" tone="muted">{metric.label}</WidgetText>
            <WidgetText variant="body">{metric.value}</WidgetText>
          </div>
        ))}
      </WidgetStatGrid>
      {!size.isCompact && <WidgetText variant="caption" className={theme.onSurfaceVariant}>Updated {data?.updated || "just now"}</WidgetText>}
    </WidgetBody>
  );
}

Example local notes with add and delete:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  const initialNotes = Array.isArray(data?.items) ? data.items : [
    { id: "n1", title: "Draft idea", tag: "Pinned" },
    { id: "n2", title: "Follow up", tag: "Today" }
  ];
  const [notes, setNotes] = useWidgetPersistentState(widget.id, "notes", initialNotes);
  const [selectedPriority, setSelectedPriority] = useWidgetPersistentState(widget.id, "selectedPriority", settings.defaultPriority || "normal");
  if (loading) return <WidgetBody><WidgetSkeleton variant="list" /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" /></WidgetBody>;
  const priorities = {
    low: "border-sky-300/25 bg-sky-400/10 text-sky-100",
    normal: "border-violet-300/25 bg-violet-400/10 text-violet-100",
    high: "border-rose-300/25 bg-rose-400/10 text-rose-100"
  };
  return (
    <WidgetBody scroll={size.isCompact ? "none" : "y"} gap={size.isCompact ? "sm" : "md"}>
      <div className="flex items-center justify-between gap-2">
        <WidgetText variant="label" tone="muted">{settings.title || "Notes"}</WidgetText>
        <WidgetIconButton ariaLabel="Refresh" icon={<RefreshCcw size={14} />} onClick={onRefresh} />
      </div>
      <select value={selectedPriority} onChange={(event) => setSelectedPriority(event.target.value)} className="rounded-xl border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">
        <option value="low">Low priority</option>
        <option value="normal">Normal priority</option>
        <option value="high">High priority</option>
      </select>
      <InlineQuickAdd
        placeholder="Add note"
        parser={(input) => input}
        onSubmit={(title) => setNotes((current) => [{ id: String(Date.now()), title, tag: selectedPriority, priority: selectedPriority }, ...current])}
        compact={size.isCompact}
      />
      <WidgetList
        items={notes}
        size={size}
        maxItems={size.isCompact ? 2 : 5}
        getKey={(item) => item.id || item.title}
        renderItem={(item) => (
          <div className={clsx("flex items-center gap-2 rounded-xl border px-3 py-2", priorities[item.priority || item.tag] || priorities.normal)}>
            <Plus size={14} aria-hidden />
            <div className="min-w-0 flex-1">
              <WidgetText variant="body">{item.title}</WidgetText>
              {!size.isCompact && <WidgetText variant="caption" tone="muted">{item.priority || item.tag || "normal"}</WidgetText>}
            </div>
            <WidgetIconButton ariaLabel="Delete note" icon={<Trash2 size={13} />} onClick={() => setNotes((current) => current.filter((note) => note.id !== item.id))} compact />
          </div>
        )}
      />
    </WidgetBody>
  );
}

Example running tracker:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  const goal = Math.max(1, Number(settings.goal || data?.goal || 10000));
  const [steps, setSteps] = useWidgetPersistentState(widget.id, "steps", Number(data?.steps || 0));
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" /></WidgetBody>;
  const progress = Math.min(100, Math.round((Number(steps) / goal) * 100));
  return (
    <WidgetBody gap={size.isCompact ? "sm" : "md"}>
      <div className="rounded-2xl border border-sky-300/25 bg-sky-400/10 p-3">
        <div className="flex items-center gap-2">
          <Footprints size={18} aria-hidden />
          <WidgetText variant="label" tone="muted">{settings.title || "Running Steps"}</WidgetText>
        </div>
        <WidgetHero size={size} label="" value={formatNumber(steps)} caption={"Goal " + formatNumber(goal)} />
        <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
          <div className="h-full rounded-full bg-sky-300" style={{ width: progress + "%" }} />
        </div>
      </div>
      <WidgetFooter>
        <button type="button" onClick={() => setSteps((current) => Number(current || 0) + 500)} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold">+500</button>
        <button type="button" onClick={() => setSteps((current) => Number(current || 0) + 1000)} className="rounded-xl bg-[var(--ether-control-active-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-control-active-text)]">+1k</button>
      </WidgetFooter>
    </WidgetBody>
  );
}

Example metric command dashboard:
function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" /></WidgetBody>;
  const labels = Array.isArray(data?.labels) ? data.labels : ["Mon", "Tue", "Wed", "Thu", "Fri"];
  const values = Array.isArray(data?.values) ? data.values : [6, 7, 5, 8, 9];
  const mixLabels = Array.isArray(data?.mixLabels) ? data.mixLabels : ["Deep", "Admin", "Break"];
  const mixValues = Array.isArray(data?.mixValues) ? data.mixValues : [10, 3, 2];
  return (
    <WidgetBody scroll={size.isCompact ? "none" : "y"} gap={size.isCompact ? "sm" : "md"}>
      <div className="flex items-center justify-between gap-2">
        <WidgetText variant="label" tone="muted">{settings.title || "Metric Command"}</WidgetText>
        <WidgetStatusPill label={data?.status || "Live"} tone="mint" />
      </div>
      <WidgetStatGrid size={size} maxColumns={size.isWide ? 2 : 1}>
        <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
          <WidgetText variant="caption" tone="muted">Focus</WidgetText>
          <WidgetText variant="body">{data?.focus || "18h"}</WidgetText>
        </div>
        <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
          <WidgetText variant="caption" tone="muted">Tasks</WidgetText>
          <WidgetText variant="body">{data?.tasks || "35"}</WidgetText>
        </div>
      </WidgetStatGrid>
      <WidgetProgress label="Goal" value={Number(data?.progress || 72)} max={100} detail={(data?.progress || 72) + "%"} tone="mint" />
      {!size.isCompact && <WidgetBarChart title="Completed" labels={labels} values={values} tone="sky" />}
      {size.isWide && <WidgetDonutChart title="Time Mix" labels={mixLabels} values={mixValues} />}
      <WidgetFooter><button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold">Refresh</button></WidgetFooter>
    </WidgetBody>
  );
}
`,Ca=`${gt}

${mt}

${ka}

Return only the complete JSX component. No commentary. No markdown fences.`,wa=`${gt}

${mt}

You are editing an existing Curio custom widget. Return the complete modified component, not a diff. You may redesign layout, colors, density, typography, and composition when the user asks for visual changes, and you may add interactions such as selectors, add/delete/toggle actions, counters, filters, progress bars, chart panels, status pills, local persistent state, or image panels when the user asks for more usefulness. Think through the blueprint first, then return only safe widget code. Preserve sandbox guardrails, component signature, loading/error/empty states, data-from-props only, and responsive sizing. No commentary. No markdown fences.`,Na=a=>`
Widget description:
${a.description}

Data shape:
${JSON.stringify(a.dataShape||{},null,2)}

Settings hints:
${(a.settingsHints||[]).join(", ")||"None"}

Write the custom widget now.`,Wa=(a,r)=>`
Current component:
${a}

User edit request:
${r}

Return the complete revised component.`,et=a=>a.replace(/^```(?:tsx|jsx|typescript|javascript|ts|js)?\s*/i,"").replace(/\s*```$/i,"").trim(),ht=a=>{const r=et(a),i=r.match(/\{[\s\S]*"sourceCode"\s*:[\s\S]*\}/);if(i)try{const p=JSON.parse(i[0]);if(typeof p.sourceCode=="string")return et(p.sourceCode)}catch{}const c=r.search(/\b(function|const)\s+(Widget|CustomWidget|Component)\b/);return c>=0?r.slice(c).trim():r},Ta=a=>a.replace(/[_-]+/g," ").split(/\s+/).filter(Boolean).slice(0,5).map(r=>`${r.charAt(0).toUpperCase()}${r.slice(1).toLowerCase()}`).join(" "),Pe=a=>{const r=a.replace(/[^a-zA-Z0-9\s]/g," ").trim().split(/\s+/).filter(i=>!/^(a|an|the|with|for|that|shows|display|widget)$/i.test(i));return Ta(r.slice(0,3).join(" "))||"Custom Widget"},tt=a=>{const r=a.toLowerCase();return/\b(mail|message|chat|slack|social)\b/.test(r)?"Communication":/\b(run|running|steps|fitness|workout|health)\b/.test(r)?"Health":/\b(task|calendar|note|timer|countdown|status|priority)\b/.test(r)?"Productivity":/\b(weather|air|map|time|clock|sensor)\b/.test(r)?"Context":/\b(stock|portfolio|news|quote|sports|score)\b/.test(r)?"Media":/\b(home|iot|device|light|energy)\b/.test(r)?"Smart Home":"Custom"},Ie=a=>{const r=a.toLowerCase();return/\b(run|running|steps|fitness|workout)\b/.test(r)?"Footprints":/\b(note|notes|priority|todo)\b/.test(r)?"StickyNote":/\bweather|temperature\b/.test(r)?"Cloud":/\bstock|market|ticker|portfolio\b/.test(r)?"TrendingUp":/\bsport|score\b/.test(r)?"Activity":/\bcountdown|timer\b/.test(r)?"Timer":/\bquote\b/.test(r)?"Quote":/\bapi|status\b/.test(r)?"Wifi":/\biot|sensor\b/.test(r)?"Gauge":"Sparkles"},ja=a=>{const r=Ie(a),i=[{key:"title",label:"Title",type:"text",default:Pe(a)},{key:"accentIcon",label:"Icon",type:"select",default:r,options:["Sparkles","Footprints","StickyNote","ListChecks","Palette","Activity","Gauge","Bell","TrendingUp"].map(c=>({label:c,value:c}))},{key:"colorTone",label:"Color Palette",type:"select",default:/\b(note|priority|violet)\b/i.test(a)?"violet":/\b(run|steps|fitness|sky)\b/i.test(a)?"sky":"amber",options:[{label:"Sky",value:"sky"},{label:"Mint",value:"mint"},{label:"Rose",value:"rose"},{label:"Amber",value:"amber"},{label:"Violet",value:"violet"}]},{key:"shapeStyle",label:"Shape",type:"select",default:"soft",options:[{label:"Soft",value:"soft"},{label:"Pill",value:"pill"},{label:"Sharp",value:"sharp"},{label:"Ticket",value:"ticket"}]},{key:"surfaceStyle",label:"Surface",type:"select",default:"glass",options:[{label:"Glass",value:"glass"},{label:"Color wash",value:"color"},{label:"Outline",value:"outline"}]}];return/\b(run|running|steps|fitness|workout)\b/i.test(a)&&i.push({key:"goal",label:"Daily Goal",type:"number",default:1e4,min:1e3,max:5e4,step:500}),/\b(note|notes|priority|todo)\b/i.test(a)&&i.push({key:"defaultPriority",label:"Default Priority",type:"select",default:"normal",options:[{label:"Low",value:"low"},{label:"Normal",value:"normal"},{label:"High",value:"high"}]}),/\bcolor|accent|theme\b/i.test(a)&&i.push({key:"accentColor",label:"Accent Color",type:"color",default:"#38bdf8"}),/\blimit|max|count|items\b/i.test(a)&&i.push({key:"maxItems",label:"Max Items",type:"number",default:5,min:1,max:20,step:1}),/\bcompact|details|show\b/i.test(a)&&i.push({key:"showDetails",label:"Show Details",type:"boolean",default:!0}),i},bt=async(a,r)=>{const c=await(await pt()).generateText({prompt:Wa(a,r),systemPrompt:wa,temperature:.35,allowNativeSearch:!1}),p=ht(c);if(!p.trim())throw new Error("The AI edit returned empty widget code.");return p},at=async(a,r)=>{const i=ja(a);return!r||!/\bsettings\./.test(r),i},Aa=async a=>{if(a.existingCode&&a.editInstruction){const p=await bt(a.existingCode,a.editInstruction);return{sourceCode:p,settingsSchema:await at(a.description,p),suggestedLabel:Pe(a.description),suggestedIcon:Ie(a.description),suggestedCategory:tt(a.description),suggestedKeywords:a.description.toLowerCase().split(/\W+/).filter(Boolean).slice(0,8),suggestedSize:"medium"}}const i=await(await pt()).generateText({prompt:Na(a),systemPrompt:Ca,temperature:.45,allowNativeSearch:!1}),c=ht(i);if(!c.trim())throw new Error("The AI returned empty widget code.");return{sourceCode:c,settingsSchema:await at(a.description,c),suggestedLabel:Pe(a.description),suggestedIcon:Ie(a.description),suggestedCategory:tt(a.description),suggestedKeywords:a.description.toLowerCase().split(/\W+/).filter(Boolean).slice(0,8),suggestedSize:"medium"}},J=["describe","data","preview","edit","save"],rt={describe:"Describe",data:"Data",preview:"Preview",edit:"Edit",save:"Save"},ce=["Activity","AlertCircle","AlertTriangle","Archive","ArrowDown","ArrowLeft","ArrowRight","ArrowUp","Bell","BookOpen","Bookmark","Calendar","Check","CheckCircle","CheckCircle2","ChevronDown","ChevronLeft","ChevronRight","Circle","CircleCheck","CirclePlus","CircleX","Clock","Cloud","Code2","Cpu","Database","Delete","DollarSign","Edit3","ExternalLink","FileText","Flag","Flame","Footprints","Gauge","Globe2","Heart","Home","Image","ImageIcon","ImagePlus","Info","Lightbulb","List","ListChecks","Mail","MapPin","MessageCircle","Minus","Music","Newspaper","Palette","Pencil","Pin","PinOff","Plus","PlusCircle","Quote","RefreshCcw","Server","Settings","Shield","SlidersHorizontal","Sparkles","Square","Star","StickyNote","Sun","Tag","Thermometer","Timer","TrendingUp","Trophy","Trash","Trash2","Upload","Users","Wifi","X","XCircle","Zap","Add","Checkmark","DeleteIcon","PlusIcon","Reload","Remove","TrashIcon"],Pa=`function Widget({ widget, data, loading, error, settings, onRefresh }) {
  const size = useWidgetSize(widget);
  useCardTheme();
  useMotionProfile();
  if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
  if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" /></WidgetBody>;
  const title = settings.title || "Custom Widget";
  const value = data?.value ?? "Ready";
  const iconMap = {
    Activity, AlertCircle, AlertTriangle, Archive, ArrowDown, ArrowLeft, ArrowRight,
    ArrowUp, Bell, BookOpen, Bookmark, Calendar, Check, CheckCircle, CheckCircle2,
    ChevronDown, ChevronLeft, ChevronRight, Circle, CircleCheck, CirclePlus, CircleX,
    Clock, Cloud, Code2, Cpu, Database, Delete, DollarSign, Edit3, ExternalLink,
    FileText, Flag, Flame, Footprints, Gauge, Globe2, Heart, Home, Image, ImageIcon, ImagePlus, Info,
    Lightbulb, List, ListChecks, Mail, MapPin, MessageCircle, Minus, Music, Newspaper, Palette,
    Pencil, Pin, PinOff, Plus, PlusCircle, Quote, RefreshCcw, Server, Settings, Shield,
    SlidersHorizontal, Sparkles, Square, Star, StickyNote, Sun, Tag, Thermometer, Timer,
    TrendingUp, Trophy, Trash, Trash2, Upload, Users, Wifi, X, XCircle, Zap,
    Add, Checkmark, DeleteIcon, PlusIcon, Reload, Remove, TrashIcon
  };
  const Icon = iconMap[settings.accentIcon || "Sparkles"] || Sparkles;
  const toneMap = {
    sky: "border-sky-300/30 bg-sky-400/10 text-sky-100",
    mint: "border-emerald-300/30 bg-emerald-400/10 text-emerald-100",
    rose: "border-rose-300/30 bg-rose-400/10 text-rose-100",
    amber: "border-amber-300/30 bg-amber-400/10 text-amber-100",
    violet: "border-violet-300/30 bg-violet-400/10 text-violet-100"
  };
  const shapeMap = {
    soft: "rounded-2xl",
    pill: "rounded-[2rem]",
    sharp: "rounded-xl",
    ticket: "rounded-2xl border-l-4"
  };
  const surfaceMap = {
    glass: "border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)]",
    color: "border",
    outline: "border border-[var(--ether-glass-border)] bg-transparent"
  };
  const align = settings.alignment === "center" ? "center" : "start";
  const bodyAlign = settings.placement === "center" ? "center" : settings.placement === "bottom" ? "end" : "start";
  const gap = settings.density === "compact" ? "xs" : settings.density === "roomy" ? "lg" : size.isCompact ? "sm" : "md";
  const minRem = settings.textScale === "compact" ? 1.1 : settings.textScale === "large" ? 1.9 : undefined;
  const maxRem = settings.textScale === "compact" ? 2.2 : settings.textScale === "large" ? 5.5 : undefined;
  const toneClass = toneMap[settings.colorTone || "sky"] || toneMap.sky;
  const shapeClass = shapeMap[settings.shapeStyle || "soft"] || shapeMap.soft;
  const surfaceClass = surfaceMap[settings.surfaceStyle || "glass"] || surfaceMap.glass;
  return (
    <WidgetBody gap={gap} align={bodyAlign}>
      <div className={clsx("min-w-0 p-3", shapeClass, surfaceClass, settings.surfaceStyle === "color" && toneClass)}>
        <div className={align === "center" ? "flex items-center justify-center gap-2 text-center" : "flex items-center gap-2"}>
          {!size.isCompact && <Icon size={22} className="text-[var(--dashboard-widget-accent,var(--ether-sky))]" aria-hidden />}
          <WidgetText variant="label" tone="muted" align={align}>{title}</WidgetText>
        </div>
        <WidgetHero size={size} align={align} minRem={minRem} maxRem={maxRem} label="" value={value} caption={data?.label || "Static preview"} />
      </div>
      {settings.showFooter !== false && <WidgetFooter><button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">Refresh</button></WidgetFooter>}
    </WidgetBody>
  );
}`,st={type:"static",authType:"none",refreshIntervalSeconds:0,staticData:{value:"Ready",label:"Static data"}},Ia={items:[{id:"n1",title:"Sketch widget idea",priority:"high",done:!1},{id:"n2",title:"Review dashboard layout",priority:"normal",done:!1}],updated:"just now"},za={steps:4200,goal:1e4,streak:4},ot=a=>({type:"static",authType:"none",refreshIntervalSeconds:0,staticData:a}),ze=(a,r="")=>{const i=`${r}
${a}`.toLowerCase(),c=/\b(api|rest|graphql|mcp|nasa|apod|weather|stock|holiday|github|external|remote|live data)\b/i.test(r);return!c&&/\b(run|running|steps|footprints|setsteps)\b/.test(i)?za:!c&&/\b(note|notes|priority|inlinequickadd|setnotes|stickynote)\b/.test(i)?Ia:null},Da=(a,r)=>{if(r.type==="static"||!ze(a))return!1;const i=JSON.stringify(r).toLowerCase();return r.authType!=="none"||i.includes("{{api_key}}")||i.includes("{{token}}")},ue=[{key:"title",label:"Title",type:"text",default:"Custom Widget"},{key:"accentIcon",label:"Icon",type:"select",default:"Sparkles",options:ce.map(a=>({label:a,value:a}))},{key:"textScale",label:"Text Size",type:"select",default:"normal",options:[{label:"Compact",value:"compact"},{label:"Normal",value:"normal"},{label:"Large",value:"large"}]},{key:"alignment",label:"Text Alignment",type:"select",default:"start",options:[{label:"Left",value:"start"},{label:"Center",value:"center"}]},{key:"placement",label:"Element Placement",type:"select",default:"start",options:[{label:"Top",value:"start"},{label:"Center",value:"center"},{label:"Bottom",value:"bottom"}]},{key:"density",label:"Density",type:"select",default:"comfortable",options:[{label:"Compact",value:"compact"},{label:"Comfortable",value:"comfortable"},{label:"Roomy",value:"roomy"}]},{key:"colorTone",label:"Color Palette",type:"select",default:"sky",options:[{label:"Sky",value:"sky"},{label:"Mint",value:"mint"},{label:"Rose",value:"rose"},{label:"Amber",value:"amber"},{label:"Violet",value:"violet"}]},{key:"shapeStyle",label:"Shape",type:"select",default:"soft",options:[{label:"Soft",value:"soft"},{label:"Pill",value:"pill"},{label:"Sharp",value:"sharp"},{label:"Ticket",value:"ticket"}]},{key:"surfaceStyle",label:"Surface",type:"select",default:"glass",options:[{label:"Glass",value:"glass"},{label:"Color wash",value:"color"},{label:"Outline",value:"outline"}]},{key:"showFooter",label:"Show Footer",type:"boolean",default:!0}],Ra=ue,Ea=ba(),ie=[{id:"tiny",label:"1x1",w:1,h:1,width:210,height:190},{id:"small",label:"2x2",w:2,h:2,width:320,height:300},{id:"medium",label:"3x2",w:3,h:2,width:430,height:300},{id:"large",label:"4x3",w:4,h:3,width:540,height:420}],Ma=(a="Custom Widget")=>({label:a,icon:"Sparkles",description:"",category:"Custom",keywords:"",defaultSize:"medium",minW:"1",minH:"1",maxW:String(ut),maxH:String(ct)}),La=a=>({label:a.label,icon:a.icon,description:a.description,category:a.category,keywords:a.keywords.join(", "),defaultSize:a.defaultSize,minW:String(a.minW??""),minH:String(a.minH??""),maxW:String(a.maxW??""),maxH:String(a.maxH??"")}),q=a=>JSON.parse(JSON.stringify(a)),it=14,De=a=>!!a&&typeof a=="object"&&!Array.isArray(a),Ba=a=>typeof a=="number"?`[${a}]`:/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(a)?`.${a}`:`[${JSON.stringify(a)}]`,ne=a=>`data${a.map(Ba).join("")}`,le=a=>a.reduce((r,i)=>typeof i=="number"?`${r}?.[${i}]`:/^[A-Za-z_$][A-Za-z0-9_$]*$/.test(i)?`${r}?.${i}`:`${r}?.[${JSON.stringify(i)}]`,"data"),Te=a=>Array.isArray(a)?`array (${a.length})`:a===null?"null":typeof a,je=a=>{if(typeof a=="string")return a.length>72?`"${a.slice(0,69)}..."`:`"${a}"`;if(typeof a=="number"||typeof a=="boolean"||a==null)return String(a);if(Array.isArray(a))return`${a.length} item${a.length===1?"":"s"}`;if(De(a)){const r=Object.keys(a);return`{ ${r.slice(0,3).join(", ")}${r.length>3?", ...":""} }`}return String(a)},Re=(a,r=[],i=[],c=0)=>{if(i.length>=it||c>5)return i;if(Array.isArray(a))return i.push({path:ne(r),expression:le(r),type:Te(a),sample:je(a)}),a.length>0&&Re(a[0],[...r,0],i,c+1),i;if(De(a)){const p=Object.keys(a);p.length===0&&r.length>0&&i.push({path:ne(r),expression:le(r),type:"object",sample:"{ }"});for(const f of p){if(i.length>=it)break;const S=a[f];if(De(S)||Array.isArray(S))Re(S,[...r,f],i,c+1);else{const m=[...r,f];i.push({path:ne(m),expression:le(m),type:Te(S),sample:je(S)})}}return i}return i.push({path:ne(r),expression:le(r),type:Te(a),sample:je(a)}),i},_a=a=>a.length===0?"No fields found in the current preview data.":["Copy these into widget code:",...a.map(r=>`- ${r.expression} (${r.type}) -> ${r.sample}`),"","Common JSX patterns:",...a.slice(0,4).map(r=>`{${r.expression} ?? ""}`)].join(`
`),P=(a,r,i)=>{var c;return((c=a.find(p=>p.key===r))==null?void 0:c.default)??i},Ae=(a,r)=>{const i=new Set(a.map(p=>p.key));return[...a.map(p=>{const f=r.find(S=>S.key===p.key);return f?{...f,default:p.default??f.default}:p}),...r.filter(p=>!i.has(p.key))]},Fa=a=>a.replace(/\r\n/g,`
`).replace(/[ \t]+$/gm,"").trim().concat(`
`),nt=[{id:"hero",label:"Hero",code:'<WidgetHero size={size} align={align} label={settings.title || "Title"} value={data?.value ?? "--"} caption={data?.label || "Live data"} />'},{id:"stats",label:"Stats",code:`<WidgetStatGrid size={size}>
  <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
    <WidgetText variant="label">Status</WidgetText>
    <WidgetText variant="value">{data?.status || "OK"}</WidgetText>
  </div>
  <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
    <WidgetText variant="label">Updated</WidgetText>
    <WidgetText variant="value">{data?.updatedAt || "Now"}</WidgetText>
  </div>
</WidgetStatGrid>`},{id:"list",label:"List",code:`<WidgetList
  items={Array.isArray(data?.items) ? data.items : []}
  size={size}
  maxItems={size.isCompact ? 2 : 5}
  getKey={(item, index) => item.id || item.title || index}
  renderItem={(item) => (
    <div className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2">
      <WidgetText variant="body">{item.title || item.name}</WidgetText>
      {item.subtitle && <WidgetText variant="caption" tone="muted">{item.subtitle}</WidgetText>}
    </div>
  )}
/>`},{id:"footer",label:"Footer",code:`<WidgetFooter>
  <button type="button" onClick={onRefresh} className="rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]">
    Refresh
  </button>
</WidgetFooter>`},{id:"states",label:"States",code:`if (loading) return <WidgetBody><WidgetSkeleton /></WidgetBody>;
if (error) return <WidgetBody><WidgetEmptyState title="Data error" description={error} variant="error" /></WidgetBody>;`},{id:"progress",label:"Progress",code:`<div className="rounded-2xl border border-sky-300/25 bg-sky-400/10 p-3">
  <div className="flex items-center justify-between gap-2">
    <WidgetText variant="caption" tone="muted">Progress</WidgetText>
    <WidgetText variant="caption">{Math.round(progress)}%</WidgetText>
  </div>
  <div className="mt-2 h-2 overflow-hidden rounded-full bg-white/10">
    <div className="h-full rounded-full bg-sky-300" style={{ width: Math.min(100, Math.max(0, progress)) + "%" }} />
  </div>
</div>`},{id:"chips",label:"Color chips",code:`<div className="flex flex-wrap gap-1.5">
  {["High", "Today", "Pinned"].map((chip) => (
    <span key={chip} className="rounded-full border border-violet-300/25 bg-violet-400/10 px-2 py-1 text-[10px] font-bold text-violet-100">
      {chip}
    </span>
  ))}
</div>`},{id:"selector",label:"Selector",code:`<select
  value={selectedPriority}
  onChange={(event) => setSelectedPriority(event.target.value)}
  className="rounded-xl border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-on-surface)]"
>
  <option value="low">Low priority</option>
  <option value="normal">Normal priority</option>
  <option value="high">High priority</option>
</select>`}],Ua=[{id:"running-steps",title:"Running Steps",icon:Kt,tone:"sky",description:"Track runs, add steps, show goal progress.",prompt:"Create me a widget to track my running by adding steps. It should have +500 and +1000 step buttons, a progress bar toward a configurable daily goal, a current steps hero number, a small streak detail, colorful but app-matching accents, and responsive compact and large layouts. Store step count locally with useWidgetPersistentState and read the initial goal/steps from the data prop or settings."},{id:"metric-command",title:"Metric Command",icon:Vt,tone:"mint",description:"Hero metric, status pills, progress, and compact charts.",prompt:"Create a powerful metric command widget. It should show a hero metric, two secondary metric tiles, a live status pill, a progress bar, a bar chart for recent values, and a donut chart for category mix in larger sizes. Use WidgetStatusPill, WidgetProgress, WidgetBarChart, and WidgetDonutChart where useful. Keep compact sizes focused and use only data from the data prop with safe fallbacks."},{id:"chart-studio",title:"Chart Studio",icon:Xt,tone:"sky",description:"Bar, line, and donut chart layouts from simple data.",prompt:"Create a chart studio widget that can visualize simple arrays from data. Use WidgetBarChart for comparison, WidgetLineChart for trend, and WidgetDonutChart for mix. Include a selector to switch between Overview, Trend, and Mix using React useState for temporary UI. Use responsive compact behavior and safe fallback labels and values."},{id:"api-monitor",title:"API Monitor",icon:Qt,tone:"amber",description:"Status, latency, incidents, and endpoint freshness.",prompt:"Create an API monitor widget that shows service status, uptime, latency, last incident, and freshness. Use WidgetStatusPill for status, WidgetProgress for uptime/SLO, WidgetLineChart for latency trend, and a short WidgetList for incidents. It must read data only from the data prop and include a footer refresh action."},{id:"priority-notes",title:"Priority Notes",icon:Zt,tone:"violet",description:"Add notes with a priority selector and color chips.",prompt:"Create a note widget with a selector to choose priority before adding the note. Include Low, Normal, and High priorities with colorful chips, an InlineQuickAdd row with parser and onSubmit, Trash2 delete buttons, an optional Checkmark indicator for done notes, and a responsive layout that hides secondary details in compact sizes. Store notes and the selected priority locally with useWidgetPersistentState."},{id:"habit-lab",title:"Habit Lab",icon:Yt,tone:"violet",description:"Track habits, streaks, completion, and quick toggles.",prompt:"Create a habit lab widget with a daily completion hero, habit rows with toggle buttons, streak counts, a WidgetProgress completion bar, and a WidgetBarChart weekly completion view for larger sizes. Store toggled habit state locally with useWidgetPersistentState and keep compact sizes readable."},{id:"finance-pulse",title:"Finance Pulse",icon:ea,tone:"sky",description:"Portfolio value, movement, allocation, and trend.",prompt:"Create a finance pulse widget with portfolio value, daily move, allocation donut chart, and a line chart trend. Use WidgetStatusPill for market state, WidgetDonutChart for allocation, and WidgetLineChart for trend. Use safe static fallbacks when data is missing and keep numbers readable in compact layouts."},{id:"color-dashboard",title:"Colorful Status",icon:ta,tone:"amber",description:"Turn any metric into a colorful status panel.",prompt:"Create a colorful status widget with three small metric tiles, an accent icon, a hero status value, color-coded states, and a footer refresh action. Use only data from the data prop, shared primitives, theme tokens, useWidgetSize, useCardTheme, and useMotionProfile."}],lt=(a,r)=>{const[i,c]=l.useState(a);return l.useEffect(()=>{const p=window.setTimeout(()=>c(a),r);return()=>window.clearTimeout(p)},[r,a]),i},Oa=(a,r,i)=>({id:`preview_${a}_${r}_${i}`,type:a,position:0,size:"medium",enabled:!0,config:{w:r,h:i}}),dt=(a,r,i,c,p,f,S,m)=>{const B=new Date().toISOString(),y=w=>{const j=Number(w);return Number.isFinite(j)&&j>0?j:void 0};return{id:a,type:r,label:i.label.trim()||"Custom Widget",icon:i.icon.trim()||"Sparkles",description:i.description.trim(),category:i.category.trim()||"Custom",keywords:i.keywords.split(",").map(w=>w.trim()).filter(Boolean),defaultSize:i.defaultSize,minW:y(i.minW),minH:y(i.minH),maxW:y(i.maxW),maxH:y(i.maxH),sourceCode:c,dataSource:p,settingsSchema:f,origin:S,version:(m==null?void 0:m.version)||1,versionHistory:(m==null?void 0:m.versionHistory)||[],createdAt:(m==null?void 0:m.createdAt)||B,updatedAt:B}},Ha=({criticalOrErrors:a,warnings:r})=>a>0?e.jsxs("span",{className:"rounded-full bg-rose-500/15 px-3 py-1 text-xs font-bold text-rose-300",children:["x ",a," errors"]}):r>0?e.jsxs("span",{className:"rounded-full bg-amber-500/15 px-3 py-1 text-xs font-bold text-amber-200",children:["! ",r," warnings"]}):e.jsx("span",{className:"rounded-full bg-emerald-500/15 px-3 py-1 text-xs font-bold text-emerald-200",children:"✓ 0 issues"}),xr=({profileId:a,initialDefinition:r,forkWidget:i,onClose:c,onSaved:p})=>{const f=l.useRef(null),S=l.useRef(null),m=l.useRef(null),B=l.useRef(null),[y,w]=l.useState(r?"edit":"describe"),[j,K]=l.useState(r?"manual":i?"fork":"ai"),[pe,ge]=l.useState(i?`Generate a custom widget that replicates this widget's layout and behavior: ${i.type}.`:""),[E]=l.useState(()=>(r==null?void 0:r.id)||Ut((i==null?void 0:i.type)||"Custom Widget")),[V]=l.useState(()=>(r==null?void 0:r.type)||Ot(i!=null&&i.type?`${i.type} copy`:"Custom Widget")),[u,v]=l.useState(()=>r?La(r):Ma()),[n,g]=l.useState(()=>(r==null?void 0:r.dataSource)||st),[x,I]=l.useState(()=>(r==null?void 0:r.sourceCode)||Pa),[b,A]=l.useState(()=>(r==null?void 0:r.settingsSchema)||Ra),[z,X]=l.useState(()=>(r==null?void 0:r.dataSource.staticData)||st.staticData),[_,F]=l.useState(!1),[me,Q]=l.useState(null),[Me,U]=l.useState(""),[he,xt]=l.useState("dark"),[O,be]=l.useState(null),[Z,Le]=l.useState(""),[H,xe]=l.useState(null),[yt,vt]=l.useState(!1),[G,ye]=l.useState(null),[ve,Y]=l.useState(""),[ee,te]=l.useState(""),[fe,ft]=l.useState(!0),[Se,St]=l.useState("13"),[Be,kt]=l.useState(""),_e=lt(x,300),Fe=lt(x,500),$=l.useMemo(()=>Ve(_e),[_e]),ke=$.violations.filter(t=>t.severity==="critical"||t.severity==="error").length,Ue=$.violations.filter(t=>t.severity==="warning").length,Oe=l.useMemo(()=>{const t=new Map;for(const s of $.violations)s.line&&t.set(s.line,[...t.get(s.line)||[],s]);return t},[$.violations]),W=l.useMemo(()=>ee?de(ee):void 0,[ee]),T=l.useMemo(()=>({accentIcon:String(P(b,"accentIcon",u.icon||"Sparkles")),textScale:String(P(b,"textScale","normal")),alignment:String(P(b,"alignment","start")),placement:String(P(b,"placement","start")),density:String(P(b,"density","comfortable")),colorTone:String(P(b,"colorTone","sky")),shapeStyle:String(P(b,"shapeStyle","soft")),surfaceStyle:String(P(b,"surfaceStyle","glass")),showFooter:P(b,"showFooter",!0)!==!1}),[u.icon,b]),He=l.useMemo(()=>Me||JSON.stringify(z,null,2),[Me,z]),ae=l.useMemo(()=>Re(z),[z]),Ge=l.useMemo(()=>_a(ae),[ae]),Ce=l.useMemo(()=>dt(E,V,u,Fe,n,b,j==="template"?"template":j,r),[n,Fe,E,V,r,u,j,b]);l.useEffect(()=>{var t;return S.current=document.activeElement instanceof HTMLElement?document.activeElement:null,(t=f.current)==null||t.focus({preventScroll:!0}),()=>{var s;return(s=S.current)==null?void 0:s.focus({preventScroll:!0})}},[]);const Ct=t=>{var h;if(t.key==="Escape"){t.preventDefault(),c();return}if(t.key!=="Tab")return;const s=Array.from(((h=f.current)==null?void 0:h.querySelectorAll('button:not([disabled]), input:not([disabled]), textarea:not([disabled]), select:not([disabled]), [tabindex]:not([tabindex="-1"])'))||[]).filter(C=>C.offsetParent!==null||C===document.activeElement);if(s.length===0)return;const o=s[0],d=s[s.length-1];t.shiftKey&&document.activeElement===o?(t.preventDefault(),d.focus()):!t.shiftKey&&document.activeElement===d&&(t.preventDefault(),o.focus())},we=async t=>{const s=(t??pe).trim();if(s){t!==void 0&&ge(s),F(!0),Q(null);try{const o=await Aa({description:s,dataShape:typeof z=="object"&&z?z:void 0,settingsHints:b.map(d=>d.label)});I(o.sourceCode),A(o.settingsSchema),$e(o.sourceCode,s),v(d=>({...d,label:o.suggestedLabel,icon:o.suggestedIcon,category:o.suggestedCategory,keywords:o.suggestedKeywords.join(", "),defaultSize:o.suggestedSize})),K("ai"),w("data")}catch(o){Q(o instanceof Error?o.message:"AI generation failed.")}finally{F(!1)}}},wt=t=>{const s=Ye.find(o=>o.id===t);s&&(K("template"),I(s.sourceCode),g(q(s.dataSource)),X(q(s.mockData)),A(Ae(q(s.settingsSchema),ue).map(o=>o.key==="accentIcon"?{...o,default:s.icon}:o)),te(s.sourcePresetId||""),U(JSON.stringify(s.mockData,null,2)),Y(""),v({label:s.label,icon:s.icon,description:s.description,category:s.category,keywords:s.keywords.join(", "),defaultSize:s.defaultSize,minW:String(s.minW??1),minH:String(s.minH??1),maxW:String(s.maxW??ut),maxH:String(s.maxH??ct)}),w("data"))},Nt=t=>{te(t);const s=de(t);s&&(g(q(s.dataSource)),X(q(s.mockData)),U(JSON.stringify(s.mockData,null,2)),Y(""))},Wt=t=>{const s=ot(t);g(s),X(q(t)),U(JSON.stringify(t,null,2)),te(""),Y("")},$e=(t,s="")=>{const o=ze(t,s);o&&Wt(o)},Tt=async()=>{F(!0),U("");try{ve&&(n.authType==="api_key"||n.authType==="bearer")&&await Gt(`curio_custom_widget_key:${E}`,ve);const t=await _t(E,{...n,secretKey:`curio_custom_widget_key:${E}`});X(t),U(JSON.stringify(t,null,2))}catch(t){U(t instanceof Error?t.message:"Data source test failed.")}finally{F(!1)}},jt=async()=>{if(Z.trim()){F(!0),Q(null);try{const t=await bt(x,Z);xe({before:x,after:t}),Le("")}catch(t){Q(t instanceof Error?t.message:"AI edit failed.")}finally{F(!1)}}},D=(t,s)=>{A(o=>o.map((d,h)=>h===t?{...d,...s}:d))},At=()=>{A(t=>Ae(t,ue))},k=(t,s)=>{A(o=>Ae(o,ue).map(d=>d.key===t?{...d,default:s}:d)),t==="accentIcon"&&v(o=>({...o,icon:String(s||"Sparkles")}))},Ne=t=>{const s=m.current;if(!s){I(se=>`${se}
${t}`);return}const o=s.selectionStart,d=s.selectionEnd,h=x.slice(0,o),C=x.slice(d),R=`${h}${t}${C}`;I(R),window.requestAnimationFrame(()=>{s.focus();const se=o+t.length;s.setSelectionRange(se,se)})},Pt=()=>{B.current&&m.current&&(B.current.scrollTop=m.current.scrollTop)},It=t=>{t.key==="Tab"&&(t.preventDefault(),Ne("  "))},zt=()=>{var t,s;(t=m.current)==null||t.focus(),(s=m.current)==null||s.select()},Dt=()=>{var d,h;const t=Math.max(1,Number(Be||1)),o=x.split(`
`).slice(0,t-1).join(`
`).length+(t>1?1:0);(d=m.current)==null||d.focus(),(h=m.current)==null||h.setSelectionRange(o,o)},Je=(t,s)=>{A(o=>{const d=t+s;if(d<0||d>=o.length)return o;const h=[...o],[C]=h.splice(t,1);return h.splice(d,0,C),h})},Rt=()=>{G&&(I(G.sourceCode),g(G.dataSource),A(G.settingsSchema),ye(null))},Et=()=>{H&&(I(H.after),$e(H.after),xe(null))},Mt=()=>{if(Ve(x).violations.filter(R=>R.severity==="critical"||R.severity==="error").length>0)return;const o=ze(x),d=o&&Da(x,n)?ot(o):n,h=dt(E,V,u,x,{...d,secretKey:d.authType==="api_key"||d.authType==="bearer"?`curio_custom_widget_key:${E}`:d.secretKey},b,j,r),C=Ht(a,h);p(C,!r)},Lt=l.useMemo(()=>x.split(`
`),[x]),re=J.indexOf(y),qe=ke===0,Ke=t=>{const s=O===t.id,o=s||y==="edit",d=o?Math.max(t.height,380):t.height,h=o?Math.max(t.width,420):t.width,C=Oa(V,t.w,t.h);return e.jsxs("div",{role:"radio",tabIndex:0,"aria-checked":s,onClick:()=>be(s?null:t.id),onKeyDown:R=>{(R.key==="Enter"||R.key===" ")&&(R.preventDefault(),be(s?null:t.id))},className:`rounded-[1.2rem] border p-2 text-left ${s?"border-[var(--ether-primary)] bg-[var(--ether-primary)]/10":"border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)]"}`,children:[e.jsxs("div",{className:"mb-2 flex items-center justify-between text-xs font-bold text-[var(--ether-on-surface-variant)]",children:[e.jsx("span",{children:t.label}),e.jsxs("span",{children:[t.w," x ",t.h]})]}),e.jsx("div",{"data-custom-widget-preview":"true","data-preview-expanded":o?"true":"false","data-preview-size":t.label,"data-testid":"widget-builder-preview-viewport","data-theme":he,className:"overscroll-contain overflow-auto rounded-[var(--ether-card-radius)]",style:{width:o?"100%":t.width,height:d,maxWidth:"100%"},children:e.jsx(Bt.Provider,{value:{gridWidth:t.w,gridHeight:t.h,pixelWidth:h,pixelHeight:d},children:e.jsx(Ft,{definition:Ce,widget:C,activeProfileId:a,mockData:z})})})]},t.id)};return e.jsx("div",{className:"fixed inset-0 z-[1100] flex items-center justify-center bg-black/55 p-3 backdrop-blur-md",children:e.jsxs("div",{ref:f,role:"dialog","aria-modal":"true","aria-labelledby":"widget-builder-title",tabIndex:-1,onKeyDown:Ct,className:"flex max-h-[92vh] w-full max-w-6xl flex-col overflow-hidden rounded-[1.6rem] border border-[var(--ether-glass-border)] bg-[var(--ether-overlay-panel)] text-[var(--ether-on-surface)] shadow-2xl",children:[e.jsxs("div",{className:"flex items-center justify-between gap-3 border-b border-[var(--ether-glass-border)] px-5 py-4",children:[e.jsxs("div",{children:[e.jsx("div",{className:"text-[10px] font-bold uppercase tracking-[0.22em] text-[var(--ether-on-surface-variant)]",children:"AI Widget Builder"}),e.jsx("h2",{id:"widget-builder-title",className:"text-xl font-semibold",children:r?"Edit custom widget":"Create a widget"})]}),e.jsx("button",{type:"button",onClick:c,"aria-label":"Close builder",title:"Close builder",className:"flex h-10 w-10 items-center justify-center rounded-full bg-[var(--ether-control-bg)]",children:e.jsx($t,{size:18})})]}),e.jsxs("div",{className:"flex flex-wrap gap-2 border-b border-[var(--ether-glass-border)] px-5 py-3",children:[J.map((t,s)=>e.jsx("button",{type:"button",onClick:()=>w(t),"aria-label":`Step ${s+1} of 5: ${rt[t]}`,"aria-current":y===t?"step":void 0,className:`rounded-full px-3 py-1.5 text-xs font-bold ${y===t?"bg-[var(--ether-control-active-bg)] text-[var(--ether-control-active-text)]":"bg-[var(--ether-control-bg)] text-[var(--ether-on-surface-variant)]"}`,children:rt[t]},t)),e.jsx("div",{className:"ml-auto flex items-center gap-2","aria-live":"polite",children:e.jsx(Ha,{criticalOrErrors:ke,warnings:Ue})})]}),e.jsxs("div",{className:"min-h-0 flex-1 overflow-y-auto p-5",children:[y==="describe"&&e.jsxs("div",{className:"grid gap-4 lg:grid-cols-[1fr_1.2fr]",children:[e.jsxs("section",{className:"space-y-3",children:[e.jsxs("button",{type:"button",onClick:()=>K("ai"),className:"flex w-full items-center gap-3 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-4 text-left",children:[e.jsx(oe,{size:18}),e.jsxs("span",{children:[e.jsx("span",{className:"block text-sm font-bold",children:"Describe with AI"}),e.jsx("span",{className:"text-xs text-[var(--ether-on-surface-variant)]",children:"Generate from natural language."})]})]}),e.jsxs("button",{type:"button",onClick:()=>{K("manual"),w("edit")},className:"flex w-full items-center gap-3 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-4 text-left",children:[e.jsx(Jt,{size:18}),e.jsxs("span",{children:[e.jsx("span",{className:"block text-sm font-bold",children:"Write Code"}),e.jsx("span",{className:"text-xs text-[var(--ether-on-surface-variant)]",children:"Start from guardrail-compliant boilerplate."})]})]}),e.jsxs("button",{type:"button",onClick:()=>K("template"),className:"flex w-full items-center gap-3 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-4 text-left",children:[e.jsx(We,{size:18}),e.jsxs("span",{children:[e.jsx("span",{className:"block text-sm font-bold",children:"Start from Template"}),e.jsx("span",{className:"text-xs text-[var(--ether-on-surface-variant)]",children:"Pick a complete widget template below."})]})]})]}),e.jsxs("section",{className:"space-y-4",children:[e.jsxs("label",{className:"grid gap-2",children:[e.jsx("span",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Description"}),e.jsx("textarea",{value:pe,onChange:t=>ge(t.target.value),rows:6,className:"resize-none rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3 text-sm outline-none",placeholder:"A compact widget that shows my API uptime, latency, and last incident..."})]}),me&&e.jsx("div",{className:"rounded-xl bg-rose-500/15 p-3 text-sm text-rose-200",children:me}),e.jsx("div",{className:"flex flex-wrap gap-2",children:e.jsxs("button",{type:"button",onClick:()=>we(),disabled:!pe.trim()||_,className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-active-bg)] px-4 py-2 text-sm font-bold text-[var(--ether-control-active-text)] disabled:opacity-50",children:[_?e.jsx(qt,{size:16,className:"animate-spin"}):e.jsx(oe,{size:16}),me?"Retry":"Generate"]})}),e.jsxs("div",{className:"grid gap-2 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3",children:[e.jsxs("div",{className:"flex items-center gap-2 text-sm font-bold",children:[e.jsx(oe,{size:16})," One-click builders"]}),e.jsx("div",{className:"grid gap-2 md:grid-cols-3",children:Ua.map(t=>{const s=t.icon,o=t.tone==="violet"?"border-violet-300/25 bg-violet-400/10 text-violet-100":t.tone==="amber"?"border-amber-300/25 bg-amber-400/10 text-amber-100":t.tone==="mint"?"border-emerald-300/25 bg-emerald-400/10 text-emerald-100":"border-sky-300/25 bg-sky-400/10 text-sky-100";return e.jsxs("div",{className:`rounded-2xl border p-3 ${o}`,children:[e.jsxs("div",{className:"flex items-start gap-2",children:[e.jsx(s,{size:18,"aria-hidden":!0}),e.jsxs("div",{className:"min-w-0",children:[e.jsx("div",{className:"text-sm font-bold text-[var(--ether-on-surface)]",children:t.title}),e.jsx("div",{className:"mt-1 text-xs leading-5 text-[var(--ether-on-surface-variant)]",children:t.description})]})]}),e.jsxs("div",{className:"mt-3 flex flex-wrap gap-2",children:[e.jsx("button",{type:"button",onClick:()=>we(t.prompt),disabled:_,className:"rounded-xl bg-[var(--ether-control-active-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-control-active-text)] disabled:opacity-50",children:"Build"}),e.jsx("button",{type:"button",onClick:()=>ge(t.prompt),className:"rounded-xl bg-black/15 px-3 py-2 text-xs font-bold",children:"Use prompt"})]})]},t.id)})})]}),e.jsx("div",{className:"grid gap-2 sm:grid-cols-2",children:Ye.map(t=>{const s=t.sourcePresetId?de(t.sourcePresetId):void 0;return e.jsxs("button",{type:"button",onClick:()=>wt(t.id),className:"rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3 text-left",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("span",{className:"text-sm font-bold",children:t.label}),e.jsx("span",{className:"rounded-full bg-[var(--ether-surface-container-low)] px-2 py-0.5 text-[10px] font-bold uppercase tracking-[0.12em] text-[var(--ether-on-surface-variant)]",children:(s==null?void 0:s.badge)||"Static"})]}),e.jsx("div",{className:"mt-1 text-xs leading-5 text-[var(--ether-on-surface-variant)]",children:t.description}),e.jsxs("div",{className:"mt-2 text-[11px] font-bold text-[var(--ether-on-surface-variant)]",children:[t.category,s?` - ${s.label}`:""]})]},t.id)})})]})]}),y==="data"&&e.jsxs("div",{className:"grid gap-4 lg:grid-cols-2",children:[e.jsxs("section",{className:"space-y-3",children:[e.jsxs("div",{className:"grid gap-2 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3",children:[e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Data source preset"}),e.jsxs("select",{"aria-label":"Data source preset",value:ee,onChange:t=>Nt(t.target.value),className:"rounded-xl bg-[var(--ether-surface-container-low)] px-3 py-2",children:[e.jsx("option",{value:"",children:"Custom data source"}),Ea.map(t=>e.jsx("optgroup",{label:t,children:Ee.filter(s=>s.category===t).map(s=>e.jsxs("option",{value:s.id,children:[s.label," (",s.badge,")"]},s.id))},t))]})]}),W&&e.jsxs("div",{className:"grid gap-2 rounded-xl bg-black/15 p-3 text-xs text-[var(--ether-on-surface-variant)]",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("span",{className:"rounded-full bg-[var(--ether-control-active-bg)] px-2 py-1 font-bold text-[var(--ether-control-active-text)]",children:W.badge}),e.jsx("span",{className:"font-bold text-[var(--ether-on-surface)]",children:W.label})]}),e.jsx("p",{className:"leading-5",children:W.description}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[W.setupUrl&&e.jsxs("a",{href:W.setupUrl,target:"_blank",rel:"noreferrer",className:"inline-flex items-center gap-1 rounded-lg bg-[var(--ether-control-bg)] px-2 py-1 font-bold text-[var(--ether-on-surface)]",children:["Get API key ",e.jsx(Qe,{size:12})]}),e.jsxs("a",{href:W.docsUrl,target:"_blank",rel:"noreferrer",className:"inline-flex items-center gap-1 rounded-lg bg-[var(--ether-control-bg)] px-2 py-1 font-bold text-[var(--ether-on-surface)]",children:["Docs ",e.jsx(Qe,{size:12})]})]})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Source type"}),e.jsxs("select",{value:n.type,onChange:t=>{te(""),g({...n,type:t.target.value})},className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",children:[e.jsx("option",{value:"static",children:"Static"}),e.jsx("option",{value:"rest",children:"REST"}),e.jsx("option",{value:"graphql",children:"GraphQL"}),e.jsx("option",{value:"mcp",children:"MCP"})]})]}),n.type!=="static"&&n.type!=="mcp"&&e.jsxs(e.Fragment,{children:[e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Endpoint"}),e.jsx("input",{value:n.endpoint||"",onChange:t=>g({...n,endpoint:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2"})]}),n.type==="rest"&&e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Method"}),e.jsxs("select",{value:n.method||"GET",onChange:t=>g({...n,method:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",children:[e.jsx("option",{value:"GET",children:"GET"}),e.jsx("option",{value:"POST",children:"POST"})]})]}),e.jsx("textarea",{value:JSON.stringify(n.headers||{},null,2),onChange:t=>{try{g({...n,headers:JSON.parse(t.target.value)})}catch{g({...n,headers:{}})}},rows:4,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs",placeholder:'{"X-API-Key":"{{API_KEY}}"}'}),n.type==="rest"&&n.method==="POST"&&e.jsx("textarea",{value:n.body||"",onChange:t=>g({...n,body:t.target.value}),rows:4,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs",placeholder:'{"city":"{{city}}"}'}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Auth"}),e.jsxs("select",{value:n.authType,onChange:t=>g({...n,authType:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",children:[e.jsx("option",{value:"none",children:"None"}),e.jsx("option",{value:"api_key",children:"API key"}),e.jsx("option",{value:"bearer",children:"Bearer"}),e.jsx("option",{value:"oauth",children:"OAuth"})]})]}),n.authType==="api_key"&&e.jsx("input",{value:n.authHeaderName||"",onChange:t=>g({...n,authHeaderName:t.target.value}),placeholder:"API key header, e.g. X-API-Key",className:"w-full rounded-xl bg-[var(--ether-control-bg)] px-3 py-2"}),n.authType!=="none"&&e.jsx("input",{value:ve,onChange:t=>Y(t.target.value),type:"password",placeholder:`${(W==null?void 0:W.credentialLabel)||"Credential"} stored encrypted`,className:"w-full rounded-xl bg-[var(--ether-control-bg)] px-3 py-2"}),e.jsx("input",{value:n.responsePath||"",onChange:t=>g({...n,responsePath:t.target.value}),placeholder:"Response path, e.g. data.items",className:"w-full rounded-xl bg-[var(--ether-control-bg)] px-3 py-2"}),e.jsx("textarea",{value:JSON.stringify(n.responseMapping||{},null,2),onChange:t=>{try{g({...n,responseMapping:JSON.parse(t.target.value)})}catch{g({...n,responseMapping:{}})}},rows:4,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs",placeholder:'{"title":"name","value":"metrics.value"}'})]}),n.type==="graphql"&&e.jsxs(e.Fragment,{children:[e.jsx("textarea",{value:n.query||"",onChange:t=>g({...n,query:t.target.value}),rows:5,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs",placeholder:"GraphQL query"}),e.jsx("textarea",{value:n.variables||"{}",onChange:t=>g({...n,variables:t.target.value}),rows:4,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs",placeholder:"GraphQL variables JSON"})]}),n.type==="mcp"&&e.jsxs("div",{className:"grid gap-2",children:[e.jsx("input",{value:n.mcpServerId||"",onChange:t=>g({...n,mcpServerId:t.target.value}),placeholder:"MCP server id",className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2"}),e.jsx("input",{value:n.mcpToolName||"",onChange:t=>g({...n,mcpToolName:t.target.value}),placeholder:"MCP tool name",className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2"}),e.jsx("textarea",{value:JSON.stringify(n.mcpArgs||{},null,2),onChange:t=>{try{g({...n,mcpArgs:JSON.parse(t.target.value)})}catch{g({...n,mcpArgs:{}})}},rows:5,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs",placeholder:'{"query":"status"}'})]}),n.type==="static"&&e.jsx("textarea",{value:JSON.stringify(n.staticData??{},null,2),onChange:t=>{try{const s=JSON.parse(t.target.value);g({...n,staticData:s}),X(s)}catch{g({...n,staticData:t.target.value})}},rows:10,className:"w-full resize-none rounded-xl bg-[var(--ether-control-bg)] p-3 font-mono text-xs"}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("input",{type:"number",value:n.refreshIntervalSeconds,onChange:t=>g({...n,refreshIntervalSeconds:Number(t.target.value)}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2","aria-label":"Refresh interval seconds"}),e.jsx("button",{type:"button",onClick:Tt,disabled:_,className:"rounded-xl bg-[var(--ether-control-active-bg)] px-3 py-2 text-sm font-bold text-[var(--ether-control-active-text)]",children:"Test"})]}),e.jsxs("div",{className:"grid gap-2 sm:grid-cols-2",children:[e.jsx("button",{type:"button",onClick:()=>{var t;return(t=navigator.clipboard)==null?void 0:t.writeText(He)},className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold",children:"Copy data preview"}),e.jsx("button",{type:"button",onClick:()=>{var t;return(t=navigator.clipboard)==null?void 0:t.writeText(Ge)},className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold",children:"Copy field guide"})]})]}),e.jsxs("section",{className:"grid gap-3",children:[e.jsxs("div",{className:"grid min-h-0 gap-2",children:[e.jsx("div",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Data preview"}),e.jsx("pre",{className:"max-h-72 overflow-auto rounded-[1.2rem] bg-black/35 p-3 text-xs text-slate-100",children:He})]}),e.jsxs("div",{className:"grid gap-2 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsx("div",{className:"text-xs font-bold uppercase tracking-[0.18em] text-[var(--ether-on-surface-variant)]",children:"Field guide"}),e.jsx("button",{type:"button",onClick:()=>{var t;return(t=navigator.clipboard)==null?void 0:t.writeText(Ge)},className:"rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:"Copy"})]}),e.jsx("div",{className:"max-h-56 overflow-auto rounded-xl bg-black/20 p-2",children:ae.length>0?e.jsx("div",{className:"grid gap-1.5",children:ae.map(t=>e.jsxs("div",{className:"grid gap-1 rounded-lg bg-black/15 px-2 py-1.5 text-xs sm:grid-cols-[minmax(0,1fr)_auto]",children:[e.jsx("code",{className:"min-w-0 break-all text-sky-100",children:t.expression}),e.jsxs("span",{className:"text-[var(--ether-on-surface-variant)]",children:[t.type," - ",t.sample]})]},t.path))}):e.jsx("div",{className:"text-xs text-[var(--ether-on-surface-variant)]",children:"No fields found in the current preview data."})})]})]})]}),y==="preview"&&e.jsxs("div",{className:"space-y-4",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsx("button",{type:"button",onClick:()=>xt(he==="dark"?"light":"dark"),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold",children:he==="dark"?"Dark":"Light"}),e.jsxs("button",{type:"button",onClick:()=>we(),disabled:_||j!=="ai",className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold disabled:opacity-40",children:[e.jsx(aa,{size:14})," Regenerate"]})]}),e.jsx("div",{role:"radiogroup","aria-label":"Preview size",className:`grid gap-3 ${O?"grid-cols-1":"lg:grid-cols-2"}`,children:ie.filter(t=>!O||O===t.id).map(Ke)})]}),y==="edit"&&e.jsxs("div",{className:"grid min-h-[34rem] gap-4 lg:grid-cols-[minmax(0,1.1fr)_minmax(18rem,0.9fr)]",children:[e.jsxs("section",{className:"min-h-0 space-y-3",children:[e.jsxs("div",{id:"widget-builder-validation-summary",className:"sr-only","aria-live":"polite",children:[ke," errors and ",Ue," warnings"]}),e.jsxs("div",{className:"grid gap-2 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3",children:[e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("label",{className:"inline-flex items-center gap-2 rounded-xl bg-black/15 px-2 py-1.5 text-xs font-bold",children:[e.jsx(ra,{size:14}),e.jsxs("select",{"aria-label":"Editor font size",value:Se,onChange:t=>St(t.target.value),className:"bg-transparent outline-none",children:[e.jsx("option",{value:"12",children:"12px"}),e.jsx("option",{value:"13",children:"13px"}),e.jsx("option",{value:"14",children:"14px"}),e.jsx("option",{value:"15",children:"15px"})]})]}),e.jsxs("button",{type:"button",onClick:()=>ft(t=>!t),"aria-pressed":fe,className:"inline-flex items-center gap-1 rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:[e.jsx(sa,{size:14})," ",fe?"Wrap on":"Wrap off"]}),e.jsx("button",{type:"button",onClick:()=>I(Fa(x)),className:"rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:"Tidy"}),e.jsx("button",{type:"button",onClick:zt,className:"rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:"Select all"}),e.jsxs("button",{type:"button",onClick:()=>{var t;return(t=navigator.clipboard)==null?void 0:t.writeText(x)},className:"inline-flex items-center gap-1 rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:[e.jsx(We,{size:14})," Copy"]})]}),e.jsxs("div",{className:"flex flex-wrap items-center gap-2",children:[e.jsxs("select",{"aria-label":"Insert code snippet",defaultValue:"",onChange:t=>{const s=nt.find(o=>o.id===t.target.value);s&&Ne(s.code),t.currentTarget.value=""},className:"rounded-xl bg-black/15 px-3 py-2 text-xs font-bold",children:[e.jsx("option",{value:"",children:"Insert snippet..."}),nt.map(t=>e.jsx("option",{value:t.id,children:t.label},t.id))]}),e.jsxs("button",{type:"button",onClick:()=>Ne(`<${T.accentIcon} size={16} aria-hidden />`),className:"inline-flex items-center gap-1 rounded-xl bg-black/15 px-3 py-2 text-xs font-bold",children:[e.jsx(oe,{size:14})," Insert icon"]}),e.jsx("input",{value:Be,onChange:t=>kt(t.target.value),inputMode:"numeric","aria-label":"Jump to line",placeholder:"Line",className:"w-20 rounded-xl bg-black/15 px-3 py-2 text-xs font-bold"}),e.jsx("button",{type:"button",onClick:Dt,className:"rounded-xl bg-black/15 px-3 py-2 text-xs font-bold",children:"Go"})]})]}),e.jsxs("div",{className:"grid h-[34rem] min-h-[26rem] grid-cols-[3.25rem_minmax(0,1fr)] overflow-hidden rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[#0f172a]",children:[e.jsx("div",{ref:B,"aria-hidden":!0,className:"overflow-hidden border-r border-white/10 bg-black/25 py-3 pr-2 text-right font-mono leading-[1.55] text-slate-500",style:{fontSize:`${Se}px`},children:Lt.map((t,s)=>{var o;return e.jsx("div",{className:Oe.has(s+1)?"text-rose-300":"",title:(o=Oe.get(s+1))==null?void 0:o.map(d=>d.message).join(`
`),children:s+1},s)})}),e.jsx("textarea",{ref:m,role:"textbox","aria-label":"Widget source code editor","aria-describedby":"widget-builder-validation-summary",value:x,onChange:t=>I(t.target.value),onScroll:Pt,onKeyDown:It,spellCheck:!1,wrap:fe?"soft":"off",className:"h-full min-h-0 w-full resize-none overflow-auto bg-transparent px-4 py-3 font-mono leading-[1.55] text-slate-100 caret-sky-200 outline-none selection:bg-sky-500/35",style:{fontSize:`${Se}px`,tabSize:2}})]}),$.violations.length>0&&e.jsx("div",{className:"max-h-32 overflow-auto rounded-[1.2rem] bg-[var(--ether-control-bg)] p-3 text-xs","aria-live":"polite",children:$.violations.map((t,s)=>e.jsxs("div",{className:"flex gap-2 py-1",children:[e.jsx("span",{className:"font-bold uppercase text-[var(--ether-on-surface-variant)]",children:t.severity}),e.jsxs("span",{className:"text-[var(--ether-on-surface)]",children:[t.line?`Line ${t.line}: `:"",t.message]})]},`${t.rule}-${t.line||s}`))}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("input",{value:Z,onChange:t=>Le(t.target.value),"aria-label":"Describe a change to your widget",placeholder:"Ask AI to adjust the widget...",className:"min-w-0 flex-1 rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm"}),e.jsx("button",{type:"button",onClick:jt,disabled:_||!Z.trim(),className:"rounded-xl bg-[var(--ether-control-active-bg)] px-3 py-2 text-sm font-bold text-[var(--ether-control-active-text)] disabled:opacity-40",children:"Send"}),e.jsx("button",{type:"button",onClick:()=>vt(t=>!t),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2","aria-label":"Version history",title:"Version history",children:e.jsx(oa,{size:16})})]}),H&&e.jsxs("div",{className:"grid gap-2 rounded-[1.2rem] bg-[var(--ether-control-bg)] p-3",children:[e.jsx("div",{className:"text-sm font-bold",children:"AI edit ready"}),e.jsxs("div",{className:"grid gap-2 lg:grid-cols-2",children:[e.jsx("pre",{className:"max-h-44 overflow-auto rounded-xl bg-black/30 p-2 text-xs",children:H.before}),e.jsx("pre",{className:"max-h-44 overflow-auto rounded-xl bg-black/30 p-2 text-xs",children:H.after})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"button",onClick:Et,className:"rounded-xl bg-emerald-500/20 px-3 py-2 text-sm font-bold text-emerald-200",children:"Accept"}),e.jsx("button",{type:"button",onClick:()=>xe(null),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold",children:"Reject"})]})]}),yt&&(r!=null&&r.versionHistory.length)?e.jsxs("div",{className:"space-y-2 rounded-[1.2rem] bg-[var(--ether-control-bg)] p-3",children:[r.versionHistory.map(t=>e.jsxs("button",{type:"button",onClick:()=>ye(t),className:"block w-full rounded-xl bg-[var(--ether-surface-container-low)] px-3 py-2 text-left text-xs",children:["View ",new Date(t.updatedAt).toLocaleString()]},t.updatedAt)),G&&e.jsxs("div",{className:"grid gap-2 rounded-xl bg-black/25 p-3",children:[e.jsx("div",{className:"text-xs font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Restore preview"}),e.jsxs("div",{className:"grid gap-2 lg:grid-cols-2",children:[e.jsx("pre",{className:"max-h-44 overflow-auto rounded-xl bg-black/30 p-2 text-xs",children:x}),e.jsx("pre",{className:"max-h-44 overflow-auto rounded-xl bg-black/30 p-2 text-xs",children:G.sourceCode})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsx("button",{type:"button",onClick:Rt,className:"rounded-xl bg-[var(--ether-control-active-bg)] px-3 py-2 text-xs font-bold text-[var(--ether-control-active-text)]",children:"Restore selected version"}),e.jsx("button",{type:"button",onClick:()=>ye(null),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-xs font-bold",children:"Cancel"})]})]})]}):null]}),e.jsxs("section",{className:"min-h-0 space-y-3",children:[e.jsxs("div",{className:"grid gap-3 rounded-[1.2rem] border border-[var(--ether-glass-border)] bg-[var(--ether-control-bg)] p-3",children:[e.jsxs("div",{className:"flex items-center justify-between gap-2",children:[e.jsxs("div",{className:"inline-flex items-center gap-2 text-sm font-bold",children:[e.jsx(ia,{size:16})," Design"]}),e.jsx("button",{type:"button",onClick:At,className:"rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:"Add controls"})]}),e.jsxs("div",{className:"grid gap-2 sm:grid-cols-2",children:[e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Widget icon"}),e.jsx("select",{"aria-label":"Widget icon",value:T.accentIcon,onChange:t=>k("accentIcon",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:ce.map(t=>e.jsx("option",{value:t,children:t},t))})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Text size"}),e.jsxs("select",{"aria-label":"Widget text size",value:T.textScale,onChange:t=>k("textScale",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"compact",children:"Compact"}),e.jsx("option",{value:"normal",children:"Normal"}),e.jsx("option",{value:"large",children:"Large"})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Text alignment"}),e.jsxs("select",{"aria-label":"Widget text alignment",value:T.alignment,onChange:t=>k("alignment",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"start",children:"Left"}),e.jsx("option",{value:"center",children:"Center"})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Placement"}),e.jsxs("select",{"aria-label":"Widget element placement",value:T.placement,onChange:t=>k("placement",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"start",children:"Top"}),e.jsx("option",{value:"center",children:"Center"}),e.jsx("option",{value:"bottom",children:"Bottom"})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Density"}),e.jsxs("select",{"aria-label":"Widget density",value:T.density,onChange:t=>k("density",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"compact",children:"Compact"}),e.jsx("option",{value:"comfortable",children:"Comfortable"}),e.jsx("option",{value:"roomy",children:"Roomy"})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Palette"}),e.jsxs("select",{"aria-label":"Widget color palette",value:T.colorTone,onChange:t=>k("colorTone",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"sky",children:"Sky"}),e.jsx("option",{value:"mint",children:"Mint"}),e.jsx("option",{value:"rose",children:"Rose"}),e.jsx("option",{value:"amber",children:"Amber"}),e.jsx("option",{value:"violet",children:"Violet"})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Shape"}),e.jsxs("select",{"aria-label":"Widget shape",value:T.shapeStyle,onChange:t=>k("shapeStyle",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"soft",children:"Soft"}),e.jsx("option",{value:"pill",children:"Pill"}),e.jsx("option",{value:"sharp",children:"Sharp"}),e.jsx("option",{value:"ticket",children:"Ticket"})]})]}),e.jsxs("label",{className:"grid gap-1.5",children:[e.jsx("span",{className:"text-[10px] font-bold uppercase tracking-[0.16em] text-[var(--ether-on-surface-variant)]",children:"Surface"}),e.jsxs("select",{"aria-label":"Widget surface",value:T.surfaceStyle,onChange:t=>k("surfaceStyle",t.target.value),className:"rounded-xl bg-black/15 px-3 py-2 text-sm",children:[e.jsx("option",{value:"glass",children:"Glass"}),e.jsx("option",{value:"color",children:"Color wash"}),e.jsx("option",{value:"outline",children:"Outline"})]})]}),e.jsxs("label",{className:"flex items-center gap-2 rounded-xl bg-black/15 px-3 py-2 text-sm font-bold",children:[e.jsx("input",{type:"checkbox",checked:T.showFooter,onChange:t=>k("showFooter",t.target.checked)}),"Show footer"]})]}),e.jsxs("div",{className:"flex flex-wrap gap-2",children:[e.jsxs("button",{type:"button",onClick:()=>k("alignment","start"),className:"inline-flex items-center gap-1 rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:[e.jsx(na,{size:14})," Left"]}),e.jsxs("button",{type:"button",onClick:()=>k("alignment","center"),className:"inline-flex items-center gap-1 rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:[e.jsx(la,{size:14})," Center"]}),e.jsxs("button",{type:"button",onClick:()=>w("preview"),className:"inline-flex items-center gap-1 rounded-xl bg-black/15 px-3 py-1.5 text-xs font-bold",children:[e.jsx(da,{size:14})," Full preview"]})]})]}),e.jsx("div",{role:"radiogroup","aria-label":"Preview size",className:"mb-3 flex flex-wrap gap-2",children:ie.map(t=>e.jsx("button",{type:"button",onClick:()=>be(t.id),className:`rounded-full px-3 py-1.5 text-xs font-bold ${O===t.id?"bg-[var(--ether-control-active-bg)] text-[var(--ether-control-active-text)]":"bg-[var(--ether-control-bg)]"}`,children:t.label},t.id))}),Ke(ie.find(t=>t.id===O)||ie[1])]})]}),y==="save"&&e.jsxs("div",{className:"grid gap-4 lg:grid-cols-[1fr_1fr]",children:[e.jsxs("section",{className:"grid gap-3",children:[e.jsx("input",{value:u.label,onChange:t=>v({...u,label:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Label"}),e.jsxs("div",{className:"grid gap-2 sm:grid-cols-[1fr_1fr]",children:[e.jsx("select",{"aria-label":"Saved widget icon",value:ce.includes(u.icon)?u.icon:"Sparkles",onChange:t=>{v({...u,icon:t.target.value}),k("accentIcon",t.target.value)},className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",children:ce.map(t=>e.jsx("option",{value:t,children:t},t))}),e.jsx("input",{value:u.icon,onChange:t=>v({...u,icon:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Custom icon text"})]}),e.jsx("textarea",{value:u.description,onChange:t=>v({...u,description:t.target.value}),rows:3,className:"resize-none rounded-xl bg-[var(--ether-control-bg)] p-3",placeholder:"Description"}),e.jsx("input",{value:u.category,onChange:t=>v({...u,category:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Category"}),e.jsx("input",{value:u.keywords,onChange:t=>v({...u,keywords:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"keyword, another"}),e.jsxs("select",{value:u.defaultSize,onChange:t=>v({...u,defaultSize:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2","aria-label":"Default widget size",children:[e.jsx("option",{value:"small",children:"Small"}),e.jsx("option",{value:"medium",children:"Medium"}),e.jsx("option",{value:"large",children:"Large"}),e.jsx("option",{value:"xlarge",children:"Extra large"})]}),e.jsxs("div",{className:"grid grid-cols-2 gap-2",children:[e.jsx("input",{value:u.minW,onChange:t=>v({...u,minW:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Min W"}),e.jsx("input",{value:u.minH,onChange:t=>v({...u,minH:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Min H"}),e.jsx("input",{value:u.maxW,onChange:t=>v({...u,maxW:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Max W"}),e.jsx("input",{value:u.maxH,onChange:t=>v({...u,maxH:t.target.value}),className:"rounded-xl bg-[var(--ether-control-bg)] px-3 py-2",placeholder:"Max H"})]})]}),e.jsxs("section",{className:"space-y-3",children:[e.jsxs("div",{className:"flex items-center justify-between",children:[e.jsx("div",{className:"text-sm font-bold",children:"Settings Schema"}),e.jsx("button",{type:"button",onClick:()=>A([...b,{key:`field${b.length+1}`,label:"New Field",type:"text",default:""}]),className:"rounded-xl bg-[var(--ether-control-bg)] p-2","aria-label":"Add setting field",title:"Add setting field",children:e.jsx(ca,{size:16})})]}),b.map((t,s)=>e.jsxs("div",{className:"grid grid-cols-[1fr_1fr_auto] gap-2 rounded-xl bg-[var(--ether-control-bg)] p-2",children:[e.jsx("input",{value:t.key,onChange:o=>D(s,{key:o.target.value}),className:"rounded-lg bg-black/15 px-2 py-1 text-sm"}),e.jsx("input",{value:t.label,onChange:o=>D(s,{label:o.target.value}),className:"rounded-lg bg-black/15 px-2 py-1 text-sm"}),e.jsx("button",{type:"button",onClick:()=>A(b.filter((o,d)=>d!==s)),"aria-label":`Remove ${t.label}`,title:`Remove ${t.label}`,className:"rounded-lg bg-rose-500/15 px-2 text-rose-300",children:e.jsx(ua,{size:14})}),e.jsxs("select",{value:t.type,onChange:o=>D(s,{type:o.target.value}),className:"col-span-3 rounded-lg bg-black/15 px-2 py-1 text-sm",children:[e.jsx("option",{value:"text",children:"Text"}),e.jsx("option",{value:"number",children:"Number"}),e.jsx("option",{value:"boolean",children:"Boolean"}),e.jsx("option",{value:"select",children:"Select"}),e.jsx("option",{value:"color",children:"Color"}),e.jsx("option",{value:"secret",children:"Secret"})]}),e.jsx("input",{value:String(t.default??""),onChange:o=>D(s,{default:t.type==="number"?Number(o.target.value):o.target.value}),className:"col-span-3 rounded-lg bg-black/15 px-2 py-1 text-sm",placeholder:"Default value"}),t.type==="number"&&e.jsxs("div",{className:"col-span-3 grid grid-cols-3 gap-2",children:[e.jsx("input",{value:t.min??"",onChange:o=>D(s,{min:o.target.value===""?void 0:Number(o.target.value)}),className:"rounded-lg bg-black/15 px-2 py-1 text-sm",placeholder:"Min"}),e.jsx("input",{value:t.max??"",onChange:o=>D(s,{max:o.target.value===""?void 0:Number(o.target.value)}),className:"rounded-lg bg-black/15 px-2 py-1 text-sm",placeholder:"Max"}),e.jsx("input",{value:t.step??"",onChange:o=>D(s,{step:o.target.value===""?void 0:Number(o.target.value)}),className:"rounded-lg bg-black/15 px-2 py-1 text-sm",placeholder:"Step"})]}),t.type==="select"&&e.jsx("textarea",{value:(t.options||[]).map(o=>`${o.label}:${o.value}`).join(`
`),onChange:o=>D(s,{options:o.target.value.split(`
`).map(d=>d.trim()).filter(Boolean).map(d=>{const[h,...C]=d.split(":");return{label:h.trim(),value:(C.join(":")||h).trim()}})}),rows:3,className:"col-span-3 resize-none rounded-lg bg-black/15 px-2 py-1 text-sm",placeholder:"Label:value"}),e.jsxs("div",{className:"col-span-3 flex gap-2",children:[e.jsx("button",{type:"button",onClick:()=>Je(s,-1),disabled:s===0,className:"rounded-lg bg-black/15 px-2 py-1 text-xs font-bold disabled:opacity-40",children:"Move up"}),e.jsx("button",{type:"button",onClick:()=>Je(s,1),disabled:s===b.length-1,className:"rounded-lg bg-black/15 px-2 py-1 text-xs font-bold disabled:opacity-40",children:"Move down"})]})]},`${t.key}-${s}`))]})]})]}),e.jsxs("div",{className:"flex flex-wrap items-center justify-between gap-2 border-t border-[var(--ether-glass-border)] px-5 py-4",children:[e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("button",{type:"button",onClick:()=>w(J[Math.max(0,re-1)]),disabled:re===0,className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold disabled:opacity-40",children:[e.jsx(pa,{size:16})," Back"]}),e.jsxs("button",{type:"button",onClick:()=>w(J[Math.min(J.length-1,re+1)]),disabled:re===J.length-1,className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold disabled:opacity-40",children:["Next ",e.jsx(ga,{size:16})]})]}),e.jsxs("div",{className:"flex gap-2",children:[e.jsxs("button",{type:"button",onClick:()=>{var t;return(t=navigator.clipboard)==null?void 0:t.writeText(Xe(Ce))},className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold",children:[e.jsx(We,{size:16})," Copy JSON"]}),e.jsxs("button",{type:"button",onClick:()=>{const t=new Blob([Xe(Ce)],{type:"application/json"}),s=URL.createObjectURL(t),o=document.createElement("a");o.href=s,o.download=`${V}.curio-widget.json`,o.click(),URL.revokeObjectURL(s)},className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-bg)] px-3 py-2 text-sm font-bold",children:[e.jsx(ma,{size:16})," Export"]}),e.jsxs("button",{type:"button",onClick:Mt,disabled:!qe,title:qe?"Save widget":"Fix validation errors before saving",className:"inline-flex items-center gap-2 rounded-xl bg-[var(--ether-control-active-bg)] px-4 py-2 text-sm font-bold text-[var(--ether-control-active-text)] disabled:opacity-45",children:[e.jsx(ha,{size:16})," Save to Dashboard"]})]})]})]})})};export{xr as default};
