// Blog HTML Generator Functions
// To be used with admin-blogs.html

// Simple blog template (kept for reference)
const SIMPLE_TEMPLATE = `
<!DOCTYPE html>
<html>
<head>
    <title>{TITLE}</title>
    <meta charset="utf-8">
    <meta name="viewport" content="width=device-width, initial-scale=1">
    <style>
        body { 
            font-family: 'Montserrat', sans-serif; 
            background: #0a0a0a; 
            color: #e6e6e6; 
            padding: 20px; 
            margin: 0;
        }
        .container { max-width: 1200px; margin: 0 auto; }
        .blog-header { 
            background: linear-gradient(135deg, #0a0a0a 0%, #1a1a1a 100%); 
            padding: 60px 20px; 
            text-align: center; 
            border-bottom: 1px solid #2e2e2e;
        }
        .blog-title { 
            font-size: 48px; 
            color: #fff; 
            margin-bottom: 20px;
            position: relative;
            display: inline-block;
        }
        .red-dot {
            position: absolute;
            width: 12px;
            height: 12px;
            background: #ff003a;
            border-radius: 2px;
            top: -2px;
            left: 50%;
            transform: translateX(-50%);
        }
        .featured-image {
            width: 100%;
            max-height: 600px;
            object-fit: cover;
            border-radius: 12px;
            margin: 40px 0;
        }
        .blog-content {
            font-size: 18px;
            line-height: 1.8;
            margin: 40px 0;
        }
        .blog-content img {
            max-width: 100%;
            border-radius: 8px;
            margin: 20px 0;
        }
        @media (max-width: 768px) {
            .blog-title { font-size: 32px; }
            .blog-content { font-size: 16px; }
        }
    </style>
</head>
<body>
    <div class="container">
        <header class="blog-header">
            <h1 class="blog-title">
                <span class="i-letter">{TITLE}<span class="red-dot"></span></span>
            </h1>
            <p>Year: {YEAR}</p>
        </header>
        
        <img src="{FEATURED_IMAGE}" alt="{TITLE}" class="featured-image" onerror="this.src='https://placehold.co/1200x600/1a1a1a/808080?text=Blog+Image'">
        
        <div class="blog-content">
            {CONTENT}
        </div>
        
        <footer style="margin-top: 60px; padding-top: 40px; border-top: 1px solid #2e2e2e; text-align: center; color: #808080;">
            <p>© {YEAR} IRD Blog. All rights reserved.</p>
            <p>Slug: /{SLUG}.html</p>
        </footer>
    </div>
</body>
</html>`;

// Advanced template matching your blog-1.html EXACTLY
const ADVANCED_TEMPLATE = `<!doctype html> <!-- Designed & Developed By SaturnX Digital Solutions -->
<html class="no-js" lang="en-US">

 
 
<meta http-equiv="content-type" content="text/html;charset=UTF-8" />  

<head>
    <meta charset="utf-8">
    <meta http-equiv="x-ua-compatible" content="ie=edge">
    <meta name="description" content="">
    <meta name="viewport" content="width=device-width, initial-scale=1, shrink-to-fit=no">
    <title>{TITLE} | IRD Blog</title>
    <meta name='robots' content='max-image-preview:large' />
    <style>
        img:is([sizes="auto" i], [sizes^="auto," i]) {
            contain-intrinsic-size: 3000px 1500px
        }
    </style>
    <link rel='dns-prefetch' href='http://fonts.googleapis.com/' />
    <link rel="alternate" type="application/rss+xml" title="IRD Blog &raquo; Feed" href="indexd784.html?feed=rss2" />
    <link rel="alternate" type="application/rss+xml" title="IRD Blog &raquo; Comments Feed"
        href="indexa6da.html?feed=comments-rss2" />
    <link rel="alternate" type="application/rss+xml" title="IRD Blog &raquo; {TITLE} Comments Feed"
        href="index2466.html?feed=rss2&amp;p=15" />
    <script type="text/javascript">
         
        window._wpemojiSettings = { "baseUrl": "https:\\/\\/s.w.org\\/images\\/core\\/emoji\\/15.1.0\\/72x72\\/", "ext": ".png", "svgUrl": "https:\\/\\/s.w.org\\/images\\/core\\/emoji\\/15.1.0\\/svg\\/", "svgExt": ".svg", "source": { "concatemoji": "https:\\/\\/indochine.lohatheme.com\\/wp-includes\\/js\\/wp-emoji-release.min.js?ver=6.8.1" } };
           
        !function (i, n) { var o, s, e; function c(e) { try { var t = { supportTests: e, timestamp: (new Date).valueOf() }; sessionStorage.setItem(o, JSON.stringify(t)) } catch (e) { } } function p(e, t, n) { e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(t, 0, 0); var t = new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data), r = (e.clearRect(0, 0, e.canvas.width, e.canvas.height), e.fillText(n, 0, 0), new Uint32Array(e.getImageData(0, 0, e.canvas.width, e.canvas.height).data)); return t.every(function (e, t) { return e === r[t] }) } function u(e, t, n) { switch (t) { case "flag": return n(e, "\\ud83c\\udff3\\ufe0f\\u200d\\u26a7\\ufe0f", "\\ud83c\\udff3\\ufe0f\\u200b\\u26a7\\ufe0f") ? !1 : !n(e, "\\ud83c\\uddfa\\ud83c\\uddf3", "\\ud83c\\uddfa\\u200b\\ud83c\\uddf3") && !n(e, "\\ud83c\\udff4\\udb40\\udc67\\udb40\\udc62\\udb40\\udc65\\udb40\\udc6e\\udb40\\udc67\\udb40\\udc7f", "\\ud83c\\udff4\\u200b\\udb40\\udc67\\u200b\\udb40\\udc62\\u200b\\udb40\\udc65\\u200b\\udb40\\udc6e\\u200b\\udb40\\udc67\\u200b\\udb40\\udc7f"); case "emoji": return !n(e, "\\ud83d\\udc26\\u200d\\ud83d\\udd25", "\\ud83d\\udc26\\u200b\\ud83d\\udd25") }return !1 } function f(e, t, n) { var r = "undefined" != typeof WorkerGlobalScope && self instanceof WorkerGlobalScope ? new OffscreenCanvas(300, 150) : i.createElement("canvas"), a = r.getContext("2d", { willReadFrequently: !0 }), o = (a.textBaseline = "top", a.font = "600 32px Arial", {}); return e.forEach(function (e) { o[e] = t(a, e, n) }), o } function t(e) { var t = i.createElement("script"); t.src = e, t.defer = !0, i.head.appendChild(t) } "undefined" != typeof Promise && (o = "wpEmojiSettingsSupports", s = ["flag", "emoji"], n.supports = { everything: !0, everythingExceptFlag: !0 }, e = new Promise(function (e) { i.addEventListener("DOMContentLoaded", e, { once: !0 }) }), new Promise(function (t) { var n = function () { try { var e = JSON.parse(sessionStorage.getItem(o)); if ("object" == typeof e && "number" == typeof e.timestamp && (new Date).valueOf() < e.timestamp + 604800 && "object" == typeof e.supportTests) return e.supportTests } catch (e) { } return null }(); if (!n) { if ("undefined" != typeof Worker && "undefined" != typeof OffscreenCanvas && "undefined" != typeof URL && URL.createObjectURL && "undefined" != typeof Blob) try { var e = "postMessage(" + f.toString() + "(" + [JSON.stringify(s), u.toString(), p.toString()].join(",") + "));", r = new Blob([e], { type: "text/javascript" }), a = new Worker(URL.createObjectURL(r), { name: "wpTestEmojiSupports" }); return void (a.onmessage = function (e) { c(n = e.data), a.terminate(), t(n) }) } catch (e) { } c(n = f(s, u, p)) } t(n) }).then(function (e) { for (var t in e) n.supports[t] = e[t], n.supports.everything = n.supports.everything && n.supports[t], "flag" !== t && (n.supports.everythingExceptFlag = n.supports.everythingExceptFlag && n.supports[t]); n.supports.everythingExceptFlag = n.supports.everythingExceptFlag && !n.supports.flag, n.DOMReady = !1, n.readyCallback = function () { n.DOMReady = !0 } }).then(function () { return e }).then(function () { var e; n.supports.everything || (n.readyCallback(), (e = n.source || {}).concatemoji ? t(e.concatemoji) : e.wpemoji && e.twemoji && (t(e.twemoji), t(e.wpemoji))) })) }((window, document), window._wpemojiSettings);
         
    </script>
    <style id='wp-emoji-styles-inline-css' type='text/css'>
        img.wp-smiley,
        img.emoji {
            display: inline !important;
            border: none !important;
            box-shadow: none !important;
            height: 1em !important;
            width: 1em !important;
            margin: 0 0.07em !important;
            vertical-align: -0.1em !important;
            background: none !important;
            padding: 0 !important;
        }
    </style>
    <link rel='stylesheet' id='wp-block-library-css'
        href='wp-includes/css/dist/block-library/style.min0899.css?ver=6.8.1' type='text/css' media='all' />
    <style id='classic-theme-styles-inline-css' type='text/css'>
           
        .wp-block-button__link {
            color: #fff;
            background-color: #32373c;
            border-radius: 9999px;
            box-shadow: none;
            text-decoration: none;
            padding: calc(.667em + 2px) calc(1.333em + 2px);
            font-size: 1.125em
        }

        .wp-block-file__button {
            background: #32373c;
            color: #fff;
            text-decoration: none
        }
    </style>
    <style id='global-styles-inline-css' type='text/css'>
        :root {
            --wp--preset--aspect-ratio--square: 1;
            --wp--preset--aspect-ratio--4-3: 4/3;
            --wp--preset--aspect-ratio--3-4: 3/4;
            --wp--preset--aspect-ratio--3-2: 3/2;
            --wp--preset--aspect-ratio--2-3: 2/3;
            --wp--preset--aspect-ratio--16-9: 16/9;
            --wp--preset--aspect-ratio--9-16: 9/16;
            --wp--preset--color--black: #000000;
            --wp--preset--color--cyan-bluish-gray: #abb8c3;
            --wp--preset--color--white: #ffffff;
            --wp--preset--color--pale-pink: #f78da7;
            --wp--preset--color--vivid-red: #cf2e2e;
            --wp--preset--color--luminous-vivid-orange: #ff6900;
            --wp--preset--color--luminous-vivid-amber: #fcb900;
            --wp--preset--color--light-green-cyan: #7bdcb5;
            --wp--preset--color--vivid-green-cyan: #00d084;
            --wp--preset--color--pale-cyan-blue: #8ed1fc;
            --wp--preset--color--vivid-cyan-blue: #0693e3;
            --wp--preset--color--vivid-purple: #9b51e0;
            --wp--preset--gradient--vivid-cyan-blue-to-vivid-purple: linear-gradient(135deg, rgba(6, 147, 227, 1) 0%, rgb(155, 81, 224) 100%);
            --wp--preset--gradient--light-green-cyan-to-vivid-green-cyan: linear-gradient(135deg, rgb(122, 220, 180) 0%, rgb(0, 208, 130) 100%);
            --wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange: linear-gradient(135deg, rgba(252, 185, 0, 1) 0%, rgba(255, 105, 0, 1) 100%);
            --wp--preset--gradient--luminous-vivid-orange-to-vivid-red: linear-gradient(135deg, rgba(255, 105, 0, 1) 0%, rgb(207, 46, 46) 100%);
            --wp--preset--gradient--very-light-gray-to-cyan-bluish-gray: linear-gradient(135deg, rgb(238, 238, 238) 0%, rgb(169, 184, 195) 100%);
            --wp--preset--gradient--cool-to-warm-spectrum: linear-gradient(135deg, rgb(74, 234, 220) 0%, rgb(151, 120, 209) 20%, rgb(207, 42, 186) 40%, rgb(238, 44, 130) 60%, rgb(251, 105, 98) 80%, rgb(254, 248, 76) 100%);
            --wp--preset--gradient--blush-light-purple: linear-gradient(135deg, rgb(255, 206, 236) 0%, rgb(152, 150, 240) 100%);
            --wp--preset--gradient--blush-bordeaux: linear-gradient(135deg, rgb(254, 205, 165) 0%, rgb(254, 45, 45) 50%, rgb(107, 0, 62) 100%);
            --wp--preset--gradient--luminous-dusk: linear-gradient(135deg, rgb(255, 203, 112) 0%, rgb(199, 81, 192) 50%, rgb(65, 88, 208) 100%);
            --wp--preset--gradient--pale-ocean: linear-gradient(135deg, rgb(255, 245, 203) 0%, rgb(182, 227, 212) 50%, rgb(51, 167, 181) 100%);
            --wp--preset--gradient--electric-grass: linear-gradient(135deg, rgb(202, 248, 128) 0%, rgb(113, 206, 126) 100%);
            --wp--preset--gradient--midnight: linear-gradient(135deg, rgb(2, 3, 129) 0%, rgb(40, 116, 252) 100%);
            --wp--preset--font-size--small: 13px;
            --wp--preset--font-size--medium: 20px;
            --wp--preset--font-size--large: 36px;
            --wp--preset--font-size--x-large: 42px;
            --wp--preset--spacing--20: 0.44rem;
            --wp--preset--spacing--30: 0.67rem;
            --wp--preset--spacing--40: 1rem;
            --wp--preset--spacing--50: 1.5rem;
            --wp--preset--spacing--60: 2.25rem;
            --wp--preset--spacing--70: 3.38rem;
            --wp--preset--spacing--80: 5.06rem;
            --wp--preset--shadow--natural: 6px 6px 9px rgba(0, 0, 0, 0.2);
            --wp--preset--shadow--deep: 12px 12px 50px rgba(0, 0, 0, 0.4);
            --wp--preset--shadow--sharp: 6px 6px 0px rgba(0, 0, 0, 0.2);
            --wp--preset--shadow--outlined: 6px 6px 0px -3px rgba(255, 255, 255, 1), 6px 6px rgba(0, 0, 0, 1);
            --wp--preset--shadow--crisp: 6px 6px 0px rgba(0, 0, 0, 1);
        }

        :where(.is-layout-flex) {
            gap: 0.5em;
        }

        :where(.is-layout-grid) {
            gap: 0.5em;
        }

        body .is-layout-flex {
            display: flex;
        }

        .is-layout-flex {
            flex-wrap: wrap;
            align-items: center;
        }

        .is-layout-flex> :is(*, div) {
            margin: 0;
        }

        body .is-layout-grid {
            display: grid;
        }

        .is-layout-grid> :is(*, div) {
            margin: 0;
        }

        :where(.wp-block-columns.is-layout-flex) {
            gap: 2em;
        }

        :where(.wp-block-columns.is-layout-grid) {
            gap: 2em;
        }

        :where(.wp-block-post-template.is-layout-flex) {
            gap: 1.25em;
        }

        :where(.wp-block-post-template.is-layout-grid) {
            gap: 1.25em;
        }

        .has-black-color {
            color: var(--wp--preset--color--black) !important;
        }

        .has-cyan-bluish-gray-color {
            color: var(--wp--preset--color--cyan-bluish-gray) !important;
        }

        .has-white-color {
            color: var(--wp--preset--color--white) !important;
        }

        .has-pale-pink-color {
            color: var(--wp--preset--color--pale-pink) !important;
        }

        .has-vivid-red-color {
            color: var(--wp--preset--color--vivid-red) !important;
        }

        .has-luminous-vivid-orange-color {
            color: var(--wp--preset--color--luminous-vivid-orange) !important;
        }

        .has-luminous-vivid-amber-color {
            color: var(--wp--preset--color--luminous-vivid-amber) !important;
        }

        .has-light-green-cyan-color {
            color: var(--wp--preset--color--light-green-cyan) !important;
        }

        .has-vivid-green-cyan-color {
            color: var(--wp--preset--color--vivid-green-cyan) !important;
        }

        .has-pale-cyan-blue-color {
            color: var(--wp--preset--color--pale-cyan-blue) !important;
        }

        .has-vivid-cyan-blue-color {
            color: var(--wp--preset--color--vivid-cyan-blue) !important;
        }

        .has-vivid-purple-color {
            color: var(--wp--preset--color--vivid-purple) !important;
        }

        .has-black-background-color {
            background-color: var(--wp--preset--color--black) !important;
        }

        .has-cyan-bluish-gray-background-color {
            background-color: var(--wp--preset--color--cyan-bluish-gray) !important;
        }

        .has-white-background-color {
            background-color: var(--wp--preset--color--white) !important;
        }

        .has-pale-pink-background-color {
            background-color: var(--wp--preset--color--pale-pink) !important;
        }

        .has-vivid-red-background-color {
            background-color: var(--wp--preset--color--vivid-red) !important;
        }

        .has-luminous-vivid-orange-background-color {
            background-color: var(--wp--preset--color--luminous-vivid-orange) !important;
        }

        .has-luminous-vivid-amber-background-color {
            background-color: var(--wp--preset--color--luminous-vivid-amber) !important;
        }

        .has-light-green-cyan-background-color {
            background-color: var(--wp--preset--color--light-green-cyan) !important;
        }

        .has-vivid-green-cyan-background-color {
            background-color: var(--wp--preset--color--vivid-green-cyan) !important;
        }

        .has-pale-cyan-blue-background-color {
            background-color: var(--wp--preset--color--pale-cyan-blue) !important;
        }

        .has-vivid-cyan-blue-background-color {
            background-color: var(--wp--preset--color--vivid-cyan-blue) !important;
        }

        .has-vivid-purple-background-color {
            background-color: var(--wp--preset--color--vivid-purple) !important;
        }

        .has-black-border-color {
            border-color: var(--wp--preset--color--black) !important;
        }

        .has-cyan-bluish-gray-border-color {
            border-color: var(--wp--preset--color--cyan-bluish-gray) !important;
        }

        .has-white-border-color {
            border-color: var(--wp--preset--color--white) !important;
        }

        .has-pale-pink-border-color {
            border-color: var(--wp--preset--color--pale-pink) !important;
        }

        .has-vivid-red-border-color {
            border-color: var(--wp--preset--color--vivid-red) !important;
        }

        .has-luminous-vivid-orange-border-color {
            border-color: var(--wp--preset--color--luminous-vivid-orange) !important;
        }

        .has-luminous-vivid-amber-border-color {
            border-color: var(--wp--preset--color--luminous-vivid-amber) !important;
        }

        .has-light-green-cyan-border-color {
            border-color: var(--wp--preset--color--light-green-cyan) !important;
        }

        .has-vivid-green-cyan-border-color {
            border-color: var(--wp--preset--color--vivid-green-cyan) !important;
        }

        .has-pale-cyan-blue-border-color {
            border-color: var(--wp--preset--color--pale-cyan-blue) !important;
        }

        .has-vivid-cyan-blue-border-color {
            border-color: var(--wp--preset--color--vivid-cyan-blue) !important;
        }

        .has-vivid-purple-border-color {
            border-color: var(--wp--preset--color--vivid-purple) !important;
        }

        .has-vivid-cyan-blue-to-vivid-purple-gradient-background {
            background: var(--wp--preset--gradient--vivid-cyan-blue-to-vivid-purple) !important;
        }

        .has-light-green-cyan-to-vivid-green-cyan-gradient-background {
            background: var(--wp--preset--gradient--light-green-cyan-to-vivid-green-cyan) !important;
        }

        .has-luminous-vivid-amber-to-luminous-vivid-orange-gradient-background {
            background: var(--wp--preset--gradient--luminous-vivid-amber-to-luminous-vivid-orange) !important;
        }

        .has-luminous-vivid-orange-to-vivid-red-gradient-background {
            background: var(--wp--preset--gradient--luminous-vivid-orange-to-vivid-red) !important;
        }

        .has-very-light-gray-to-cyan-bluish-gray-gradient-background {
            background: var(--wp--preset--gradient--very-light-gray-to-cyan-bluish-gray) !important;
        }

        .has-cool-to-warm-spectrum-gradient-background {
            background: var(--wp--preset--gradient--cool-to-warm-spectrum) !important;
        }

        .has-blush-light-purple-gradient-background {
            background: var(--wp--preset--gradient--blush-light-purple) !important;
        }

        .has-blush-bordeaux-gradient-background {
            background: var(--wp--preset--gradient--blush-bordeaux) !important;
        }

        .has-luminous-dusk-gradient-background {
            background: var(--wp--preset--gradient--luminous-dusk) !important;
        }

        .has-pale-ocean-gradient-background {
            background: var(--wp--preset--gradient--pale-ocean) !important;
        }

        .has-electric-grass-gradient-background {
            background: var(--wp--preset--gradient--electric-grass) !important;
        }

        .has-midnight-gradient-background {
            background: var(--wp--preset--gradient--midnight) !important;
        }

        .has-small-font-size {
            font-size: var(--wp--preset--font-size--small) !important;
        }

        .has-medium-font-size {
            font-size: var(--wp--preset--font-size--medium) !important;
        }

        .has-large-font-size {
            font-size: var(--wp--preset--font-size--large) !important;
        }

        .has-x-large-font-size {
            font-size: var(--wp--preset--font-size--x-large) !important;
        }

        :where(.wp-block-post-template.is-layout-flex) {
            gap: 1.25em;
        }

        :where(.wp-block-post-template.is-layout-grid) {
            gap: 1.25em;
        }

        :where(.wp-block-columns.is-layout-flex) {
            gap: 2em;
        }

        :where(.wp-block-columns.is-layout-grid) {
            gap: 2em;
        }

        :root :where(.wp-block-pullquote) {
            font-size: 1.5em;
            line-height: 1.6;
        }
    </style>
    <link rel='stylesheet' id='contact-form-7-css'
        href='wp-content/plugins/contact-form-7/includes/css/stylesf2b4.css?ver=5.7.7' type='text/css' media='all' />
    <link rel='stylesheet' id='redux-extendify-styles-css'
        href='wp-content/plugins/indochine-common/redux-framework/redux-core/assets/css/extendify-utilities859d.css?ver=4.4.13'
        type='text/css' media='all' />
    <link rel='stylesheet' id='googlefonts-css' href='https://fonts.googleapis.com/css?family=Montserrat:wght@600;'
        type='text/css' media='all' />
    <link rel='stylesheet' id='fontawesome-css'
        href='wp-content/themes/indochine/assets/vendor/fontawesome-5.14.0.min0899.css?ver=6.8.1' type='text/css'
        media='all' />
    <link rel='stylesheet' id='bootstrap-css'
        href='wp-content/themes/indochine/assets/vendor/bootstrap/css/bootstrap.min0899.css?ver=6.8.1' type='text/css'
        media='all' />
    <link rel='stylesheet' id='magnific-popup-css'
        href='wp-content/themes/indochine/assets/vendor/magnific-popup/css/magnific-popup.min0899.css?ver=6.8.1'
        type='text/css' media='all' />
    <link rel='stylesheet' id='nice-select-css'
        href='wp-content/themes/indochine/assets/vendor/nice-select/css/nice-select.min0899.css?ver=6.8.1'
        type='text/css' media='all' />
    <link rel='stylesheet' id='animate-css'
        href='wp-content/themes/indochine/assets/vendor/animate.min0899.css?ver=6.8.1' type='text/css' media='all' />
    <link rel='stylesheet' id='slick-css'
        href='wp-content/themes/indochine/assets/vendor/slick/css/slick.min0899.css?ver=6.8.1' type='text/css'
        media='all' />
    <link rel='stylesheet' id='indochine-style-css'
        href='wp-content/themes/indochine/assets/css/style0899.css?ver=6.8.1' type='text/css' media='all' />
    <link rel='stylesheet' id='indochine-css-css' href='wp-content/themes/indochine/style8b14.css?ver=2024-05-07'
        type='text/css' media='all' />
    <script type="text/javascript" src="wp-includes/js/jquery/jquery.minf43b.js?ver=3.7.1" id="jquery-core-js"></script>
    <script type="text/javascript" src="wp-includes/js/jquery/jquery-migrate.min5589.js?ver=3.4.1"
        id="jquery-migrate-js"></script>
    <link rel="https://api.w.org/" href="index52f0.json?rest_route=/" />
    <link rel="alternate" title="JSON" type="application/json" href="indexf04b.json?rest_route=/wp/v2/posts/15" />
    <link rel="EditURI" type="application/rsd+xml" title="RSD" href="xmlrpc0db0.php?rsd" />
    <meta name="generator" content="WordPress 6.8.1" />
    <link rel="canonical" href="{SLUG}.html?p=15" />
    <link rel='shortlink' href='{SLUG}.html?p=15' />
    <link rel="alternate" title="oEmbed (JSON)" type="application/json+oembed"
        href="indexbc55.json?rest_route=%2Foembed%2F1.0%2Fembed&amp;url=https%3A%2F%2Findochine.lohatheme.com%2F%3Fp%3D15" />
    <link rel="alternate" title="oEmbed (XML)" type="text/xml+oembed"
        href="index9c27.php?rest_route=%2Foembed%2F1.0%2Fembed&amp;url=https%3A%2F%2Findochine.lohatheme.com%2F%3Fp%3D15&amp;format=xml" />
    <meta name="generator" content="Redux 4.4.13" />
    <meta name="generator"
        content="Elementor 3.14.1; features: e_dom_optimization, e_optimized_assets_loading, e_optimized_css_loading, a11y_improvements, additional_custom_breakpoints; settings: css_print_method-external, google_font-enabled, font_display-swap">
    <link rel="icon" href="wp-content/uploads/2024/09/IRD-LOGO.png" sizes="32x32" />
    <link rel="icon" href="wp-content/uploads/2024/09/IRD-LOGO.png" sizes="192x192" />
    <link rel="apple-touch-icon" href="wp-content/uploads/2024/09/cropped-favicon-180x180.png" />
    <meta name="msapplication-TileImage"
        content="https://indochine.lohatheme.com/wp-content/uploads/2024/09/cropped-favicon-270x270.png" />
    <style>
       .blog-thumb img{
  position: relative;
  height: auto;
  width: 101%;
  max-width: none;
  object-fit: cover !important;
}

        .blog-thumb-1 img {
            position: relative;
            /* height: 600px; */
            width: 39%;
            max-width: none;
            object-fit: cover;
        }
         .milestone-heading .highlight-box{
            left: -15px !important;
            top: 13px !important;
         }

        @media (max-width: 768px) {
            .blog-thumb img {
            position: relative;
            height: 100px;
            width: 100%;
            max-width: 930px;
            object-fit: cover;
        }
        .blog-thumb-1 img {
            position: relative;
            /* height: 200px; */
            width: 100%;
            max-width: 930px;
            object-fit: cover;
        }
        }

        .milestone-heading {
            /* margin-top: 2rem; */
            position: relative;
            font-size: 60px;
            color: #fff;
            font-weight: bold;
        }

        .milestone-heading .highlight-box {
            position: absolute;
            top: 1.2rem;
            left: 0;
            width: 20px;
            height: 20px;
            background: #ff003a;
            border-radius: 2px;
        }

        @media (max-width: 768px) {
            .milestone-heading {
                margin-left: 0;
                font-size: 40px;
                text-align: center;
                display: block;
                padding: 0 10px;
            }

            .milestone-heading .highlight-box {
                position: absolute;
                margin-top: 12px;
                width: 12px;
                height: 12px;
                background: #ff003a;
                border-radius: 2px;
            }
        }

        @media (max-width: 480px) {
            .milestone-heading {
                font-size: 32px;
                line-height: 1;
            }

            .milestone-heading .highlight-box {
                top: -9px !important;
                left: 00px !important;
            }
         
        }

        .ird-text {
            color: #fff;
            font-weight: bold;
            position: relative;
            display: inline-block;
        }

        .i-letter {
            position: relative;
            display: inline-block;
        }

        .red-dot {
            position: absolute;
            top: 15px;
            left: 66%;
            transform: translateX(-50%);
            width: 12px;
            height: 12px;
            background: #ff003a;
            /* border-radius: 2px; */
        }

        @media (max-width: 768px) {
            .ird-text {
                font-size: 30px;
            }

            .red-dot {
                position: absolute;
                left: 4.5px;
                top: 6px;
                width: 5px;
                height: 5px;
            }
        }
    </style>
    <style>
        .blog_para{
            font-size: 28.5px;
        }
        @media (max-width: 768px) {
            .blog_para{
                font-size: 20px;
            }
            
        }
    </style>
</head>

<body id="post-{ID}"
    class="wp-singular post-template-default single single-post postid-{ID} single-format-standard wp-theme-indochine elementor-default elementor-kit-7">
    <div class="page-wrapper" id="switch-mode">

        <!-- Preloader -->
        <div class="preloader">
            <div class="loader-wrapper">
                <div class="loader"></div>
                <img src="wp-content/uploads/2024/06/NAVBAR LOGO.png" alt="center-image" class="center-image">
            </div>
        </div>

        <!-- main header -->
        <header class="main-header">
            <!--Header-Upper-->
            <div class="header-upper black-120-bg">
                <div class="container clearfix">
                    <div class="header-inner rel d-flex align-items-center">
                        <div class="logo-outer">
                            <div class="logo">
                                <a href="index.html">
                                    <img src="wp-content/uploads/2024/06/NAVBAR LOGO.png" alt="IRD Logo" title="Logo"
                                        style="max-height: 20px; width: auto; display: block;">
                                </a>
                            </div>

                        </div>
                        <div class="nav-outer ms-auto clearfix">
                            <!-- Main Menu -->
                            <nav class="main-menu navbar-expand-lg">
                                <div class="navbar-header py-10">
                                    <div class="mobile-logo">
                                        <a href="index.html">
                                            <img src="wp-content/uploads/2024/06/NAVBAR LOGO.png" alt="IRD Logo"
                                                title="Logo" style="max-height: 20px; width: auto; display: block;">
                                        </a>
                                    </div>

                                    <!-- Toggle Button -->
                                    <button type="button" class="navbar-toggle" data-bs-toggle="collapse"
                                        data-bs-target=".navbar-collapse">
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                        <span class="icon-bar"></span>
                                    </button>
                                </div>
                                <div class="navbar-collapse collapse clearfix">
                                    <ul id=" menu-primary-menu" class=" navigation clearfix ">
                                        <li id="menu-item-305"
                                            class="menu-item menu-item-type-custom menu-item-object-custom  page_item current_page_item">
                                            <a title="Home Page" href="index.html">Home
                                            </a>
                                            </a>
                                        </li>
                                        <li id="menu-item-398"
                                            class="menu-item menu-item-type-post_type menu-item-object-page   398">
                                            <a title="About Us" href="about-us.html">About Us</a>
                                        </li>
                                        <li id="menu-item-46"
                                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children 46">
                                            <a title="Our Services" href="services.html">Services
                                            </a>
                                            </a>
                                        </li>
                                        <li id="menu-item-43"
                                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children   43">
                                            <a title="Portfolio" href="portfolio.html?page_id=203">Portfolio
                                            </a>
                                            </a>
                                        </li>

                                        <li id="menu-item"
                                            class="menu-item menu-item-type-custom menu-item-object-custom menu-item-has-children dropdown">
                                            <a title="Explore More" href="#">Explore
                                            </a>
                                            </a>
                                            <ul role="menu" class=" ">
                                                <li id="menu-item"
                                                    class="menu-item menu-item-type-post_type menu-item-object-page">
                                                    <a title="20 years Milestone" href="20-years-milestone.html">20 YEARS
                                                        MILESTONE
                                                    </a>
                                                </li>
                                                <li id="menu-item"
                                                    class="menu-item menu-item-type-post_type menu-item-object-post">
                                                    <a title="Blog" href="blogs.html">BLOG
                                        </a>
                                                </li>
                                                <li id="menu-item"
                                                    class="menu-item menu-item-type-post_type menu-item-object-page">
                                                    <a title="Rejoin" href="rejoin.html">REJOIN
                                                    </a>
                                                </li>
                                                <li id="menu-item"
                                                    class="menu-item menu-item-type-post_type menu-item-object-post">
                                                    <a title="Archives" href="archives.html">ARCHIVES
                                                    </a>
                                                </li>
                                                <li id="menu-item"
                                                    class="menu-item menu-item-type-post_type menu-item-object-post">
                                                    <a title="Experience Design"
                                                        href="experience-design.html">EXPERIENCE DESIGN !
                                                    </a>
                                                </li>
                                            </ul>
                                        </li>
                                        <li id="menu-item-399"
                                            class="menu-item menu-item-type-post_type menu-item-object-page 399">
                                            <a title="Contact with Us" href="connect.html">Connect
                                            </a>
                                        </li>
                                    </ul>
                                </div>
                            </nav>
                            <!-- Main Menu End-->
                        </div>

                        <!-- Search Button -->
                        <div class="search-btns">
                            <span class="search-icon">
                                <i class="far fa-search"></i>
                            </span>
                        </div>

                    </div>
                    <form class="search-project search-form" id="project-search">
                        <input type="search" placeholder="" name="s" id="s" required>
                        <button type="submit">
                            <i class="fa fa-search"></i>
                        </button>
                    </form>
                </div>
            </div>
            <!--End Header Upper-->
        </header>
        <!-- Banner Section Start -->
        <section class="banner-area blog-banner" style= "height: 500px; background-image: url(wp-content/uploads/2024/06/Explore\\ Page\\ \\(1\\).jpg);">
            <div class="container text-center">
                <div class="d-flex justify-content-center">
                    <div class="banner-content wow fadeInUp delay-0-2s">
                        <h2 class="milestone-heading">
                            BLOG
                            <span class="highlight-box"></span>
                        </h2>
                        <div class="mt-32">
                            <ul class="breadcrumb wow fadeInUp delay-0-4s">
                                <li class="breadcrumb-item">
                                    <a href="index.html">
                                        Home </a>
                                </li>
                                <li class="breadcrumb-item"><a href="./blogs.html">Blog Details</a> </li>
                            </ul>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Banner Section End -->

        <!-- Blog Area start -->
        <section class="blog-content blog-details py-100">
            <div class="container">
                <div class="row detail-info wow fadeInLeft delay-0-1s">
                    <div class="col-lg-12 left">
                        <div class="details wow fadeInUp delay-0-2s">
                            <h2 style="margin-top: -4rem; margin-left: 20px; font-size: 60px;"> {TITLE} <span
                                    style="position: absolute; top: 12px; left: 0px; ; width: 20px; height: 20px; background: #ff003a; border-radius: 2px;"></span>
                            </h2>
                            <div class="blog-thumb bg-danger ">
                                <img src="{FEATURED_IMAGE}" alt="{TITLE}">
                            </div>
                            <div class="details-desc" style="width: 100% !important;">
                                <ul class="blog-meta mb-20">

                                </ul>
                                {CONTENT}
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </section>
        <!-- Blog Area end -->

         <!-- footer area start -->
        <footer class="main-footer py-128 black-120-bg">
            <div class="footer-top mb-96">
                <div class="container d-flex justify-content-center">

                <img style="  width:70%;" src="wp-content/uploads/2024/06/IRD_WEBSITE - FOOTER QUOTE.png">
                </div>
            </div>

            <div class="footer-bottom">
                <div class="container">
                    <div class="row">
                        <div class="copyright-area col-sm-12 col-md-4 col-lg-6">
                            © Copyright IRD {YEAR}. All rights reserved.
                        </div>
                        <div class="col-xs-12 col-sm-8 col-md-4 col-lg-3">
                            <div class="footer-bottom-text">
                                <div class="d-flex content">
                                    <div class="left">
                                        <h4 class="h4-rotate " style="letter-spacing: 3px !important;">CONTACT</h4>
                                    </div>
                                    <div class="right info">
                                        <p>(UAE)
                                            <a href="callto:+97156 5599696">
                                                +97156 5599696</a>
                                        </p>
                                        <p>(INDIA)
                                            <a href="callto:+91 9550550542">+91 9550550542</a>
                                        </p>
                                        <p>(ITALY)
                                            <a href="callto:+39 328 641 8940">+39 328 641 8940</a>
                                        </p>
                                        <div class="footer-social">
                                            <span>Socials:</span>

                                            <a href="https://www.instagram.com/ird_des">
                                                <i class="fab fa-instagram"></i>
                                            </a>
                                            <a href="https://www.linkedin.com/company/irddesign/">
                                                <i class="fab fa-linkedin"></i>
                                            </a>
                                        </div>
                                    </div>
                                </div>
                            </div>
                        </div>
                        <div class="col-xs-12  col-sm-4 col-md-3 col-lg-2">
                            <div class="footer-bottom-text">
                                <div class="d-flex content">
                                    <div class="left">
                                        <h4 class="h4-rotate key-link" >KEY LINKS</h4>
                                    </div>
                                    <ul class="right links" style="margin-top: -1px !important">
                                        <li id="menu-item-307"
                                            class="menu-item menu-item-type-post_type menu-item-object-page menu-item-home current-menu-item page_item page-item-12 current_page_item   307 ">
                                            <a title="Connect" href="connect.html">CONNECT
                                            </a>
                                        </li>
                                        <li id="menu-item-313"
                                            class="menu-item menu-item-type-post_type menu-item-object-page   313">
                                            <a title="About Us" href="about-us.html">ABOUT US
                                            </a>
                                        </li>
 
                                        <li id="menu-item-310"
                                            class="menu-item menu-item-type-post_type menu-item-object-page   310">
                                            <a title="Portfolio" href="portfolio.html">PORTFOLIO
                                            </a>
                                        </li>
                                        <li id="menu-item-308"
                                            class="menu-item menu-item-type-post_type menu-item-object-page   308">
                                            <a title="Testimonials" href="index.html#testimonial-ref">TESTIMONIALS
                                            </a>
                                        </li>

                                        <li id="menu-item-310"
                                            class="menu-item menu-item-type-post_type menu-item-object-page   310">
                                            <a title="FAQs" href="services.html#faq-ref">FAQs
                                            </a>
                                        </li>

                                    </ul>
                                </div>
                            </div>
                        </div>

                    </div>
                </div>
            </div>
        </footer>
        <!-- footer area end -->


        <!-- Scroll Top Button -->
        <button class="scroll-top scroll-to-target" data-target="html"><span
                class="fas fa-angle-double-up"></span></button>

    </div>
    <!--End pagewrapper-->
    <script type="text/javascript" src="wp-content/plugins/contact-form-7/includes/swv/js/indexf2b4.js?ver=5.7.7"
        id="swv-js"></script>
    <script type="text/javascript" id="contact-form-7-js-extra">
         
        var wpcf7 = { "api": { "root": "https:\\/\\/indochine.lohatheme.com\\/index.php?rest_route=\\/", "namespace": "contact-form-7\\/v1" } };
         
    </script>
    <script type="text/javascript" src="wp-content/plugins/contact-form-7/includes/js/indexf2b4.js?ver=5.7.7"
        id="contact-form-7-js"></script>
    <script type="text/javascript" src="wp-includes/js/comment-reply.min0899.js?ver=6.8.1" id="comment-reply-js"
        async="async" data-wp-strategy="async"></script>
    <script type="text/javascript"
        src="wp-content/themes/indochine/assets/vendor/bootstrap/js/popper.min0899.js?ver=6.8.1"
        id="popper-js"></script>
    <script type="text/javascript"
        src="wp-content/themes/indochine/assets/vendor/bootstrap/js/bootstrap.min0899.js?ver=6.8.1"
        id="bootstrap-js"></script>
    <script type="text/javascript" src="wp-content/themes/indochine/assets/vendor/appear.min0899.js?ver=6.8.1"
        id="appear-js"></script>
    <script type="text/javascript" src="wp-content/themes/indochine/assets/vendor/slick/js/slick.min0899.js?ver=6.8.1"
        id="slick-js"></script>
    <script type="text/javascript"
        src="wp-content/themes/indochine/assets/vendor/magnific-popup/js/jquery.magnific-popup.min0899.js?ver=6.8.1"
        id="magnific-popup-js"></script>
    <script type="text/javascript"
        src="wp-content/themes/indochine/assets/vendor/nice-select/js/jquery.nice-select.min0899.js?ver=6.8.1"
        id="nice-select-js"></script>
    <script type="text/javascript"
        src="wp-content/themes/indochine/assets/vendor/imagesloaded.pkgd.min0899.js?ver=6.8.1"
        id="imagesloaded-5.0.0-js"></script>
    <script type="text/javascript" src="wp-content/themes/indochine/assets/vendor/isotope.pkgd.min0899.js?ver=6.8.1"
        id="isotope-js"></script>
    <script type="text/javascript" src="wp-content/themes/indochine/assets/vendor/wow.min0899.js?ver=6.8.1"
        id="wow-js"></script>
    <script type="text/javascript" src="wp-content/themes/indochine/assets/js/script0899.js?ver=6.8.1"
        id="indochine-script-js"></script>
</body>

  

</html>`;

// Utility function to escape HTML
function escapeHtml(text) {
    const div = document.createElement('div');
    div.textContent = text;
    return div.innerHTML;
}
// Function to format blog content with proper paragraphs
// Function to format blog content with proper paragraphs
function formatBlogContent(content) {
    if (!content) return '';
    
    // Escape HTML first
    content = escapeHtml(content);
    
    // Replace double line breaks with paragraph tags
    content = content.replace(/\n\s*\n/g, '</p><p>');
    
    // Replace single line breaks with <br>
    content = content.replace(/\n/g, '<br>');
    
    // Wrap in paragraph tags if not already
    if (!content.startsWith('<p>')) {
        content = '<p>' + content;
    }
    if (!content.endsWith('</p>')) {
        content = content + '</p>';
    }
    
    // Clean up any double paragraph tags
    content = content.replace(/<p><\/p>/g, '');
    
    return content;
}
// Main function to generate blog HTML
// Main function to generate blog HTML
// Main function to generate blog HTML
// Main function to generate blog HTML
// Main function to generate blog HTML - NO DOWNLOAD VERSION
async function generateBlogHTML(blogData) {
    try {
        console.log('Generating HTML for:', blogData.title);
        
        // Use advanced template for better design
        let template = ADVANCED_TEMPLATE;
        
        // Replace placeholders with actual data
        template = template.replace(/{TITLE}/g, escapeHtml(blogData.title))
                          .replace(/{ID}/g, blogData.id || Date.now())
                          .replace(/{FEATURED_IMAGE}/g, escapeHtml(blogData.image_url))
                          .replace(/{YEAR}/g, blogData.year || new Date().getFullYear())
                          .replace(/{SLUG}/g, blogData.slug || 'blog')
                          .replace(/{CONTENT}/g, formatBlogContent(blogData.content));
        
        // Generate filename
        const fileName = `${blogData.slug || blogData.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-')}.html`;
        
        // ========== ONLY SERVER SAVE ==========
        try {
            const response = await fetch('http://localhost:3000/api/save-blog', {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
                body: JSON.stringify({
                    slug: blogData.slug,
                    html: template,
                    title: blogData.title
                })
            });
            
            const result = await response.json();
            
            if (result.success) {
                console.log('✅ File saved automatically to project folder:', fileName);
                showSuccess(`Blog saved: ${fileName}`);
                return fileName;
            } else {
                throw new Error(result.error || 'Server failed to save file');
            }
            
        } catch (serverError) {
            console.error('❌ Server save failed:', serverError);
            showError('Cannot save file. Make sure the Node.js server is running.');
            throw serverError;
        }
        
    } catch (error) {
        console.error('HTML generation error:', error);
        throw error;
    }
}

// Function to generate all blogs - NO DOWNLOAD VERSION
async function generateAllBlogsHTML(allBlogs) {
    if (!allBlogs || allBlogs.length === 0) {
        throw new Error('No blogs to generate');
    }
    
    console.log(`📚 Generating ${allBlogs.length} blogs...`);
    
    try {
        // Prepare all blogs for batch save
        const blogsToSave = allBlogs.map(blog => {
            let template = ADVANCED_TEMPLATE;
            template = template.replace(/{TITLE}/g, escapeHtml(blog.title))
                             .replace(/{ID}/g, blog.id || Date.now())
                             .replace(/{FEATURED_IMAGE}/g, escapeHtml(blog.image_url))
                             .replace(/{YEAR}/g, blog.year || new Date().getFullYear())
                             .replace(/{SLUG}/g, blog.slug || 'blog')
                             .replace(/{CONTENT}/g, formatBlogContent(blog.content));
            
            return {
                title: blog.title,
                slug: blog.slug || blog.title.toLowerCase().replace(/[^\w\s-]/g, '').replace(/\s+/g, '-'),
                html: template
            };
        });
        
        // Batch save to server
        const response = await fetch('http://localhost:3000/api/save-blogs', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify({ blogs: blogsToSave })
        });
        
        const result = await response.json();
        
        if (result.success) {
            console.log(`✅ Successfully saved ${result.count}/${result.total} blogs automatically`);
            showSuccess(`Saved ${result.count} blogs to project folder`);
            return result;
        } else {
            throw new Error(result.error || 'Batch save failed');
        }
        
    } catch (error) {
        console.error('❌ Bulk generation error:', error);
        showError('Cannot save files. Make sure Node.js server is running.');
        throw error;
    }
}
// Export functions for use in other files
if (typeof module !== 'undefined' && module.exports) {
    module.exports = { generateBlogHTML, generateAllBlogsHTML, escapeHtml };
}
