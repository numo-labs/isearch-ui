'use strict';
var Justice = function() {
  // justice.css
  var cssText = "" +
".justice{position:fixed;bottom:0;left:0;right:0;background:#000;padding:0 10px 10px 10px;box-sizing:border-box;font-size:12px;font-family:monospace;display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:row wrap;flex-flow:row wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between;z-index:2147483647;-webkit-transition:400ms ease-in-out;transition:400ms ease-in-out;direction:ltr}@media (min-width: 1235px){.justice{padding-bottom:10px}}.justice.closed{-webkit-transform:translateY(100%);transform:translateY(100%)}.justice .justice-metric-wrap{display:-webkit-box;display:-ms-flexbox;display:flex;-ms-flex-flow:wrap;flex-flow:wrap;-webkit-box-pack:justify;-ms-flex-pack:justify;justify-content:space-between}.justice .justice-metric{height:40px;display:inline-block;display:-webkit-box;display:-ms-flexbox;display:flex;-webkit-box-align:center;-ms-flex-align:center;align-items:center;margin:10px 10px 0 0}.justice .justice-metric.chart{width:300px}.justice .justice-title{text-transform:uppercase;padding:3px 0.5em 3px 3px;color:#dfdfdf}.justice .justice-text{color:#dfdfdf;font-weight:600}.justice .justice-text.pass{color:#419ba3}.justice .justice-text.warn{color:#d4ca3d}.justice .justice-text.fail{color:#ce452d}.justice .justice-toggle{width:20px;height:20px;cursor:pointer;background-color:#000;position:absolute;right:0;top:-20px;opacity:0.5;border-top-left-radius:50%;-webkit-transition:400ms ease-in-out;transition:400ms ease-in-out}@media only screen and (min-device-pixel-ratio: 1.1){.justice .justice-toggle{width:40px;height:40px;top:-40px}}.justice .justice-toggle:after{content:'';position:absolute;width:50%;height:50%;border-radius:100%;margin:5px;background-color:#dfdfdf;-webkit-transition:400ms ease-in-out;transition:400ms ease-in-out}@media only screen and (min-device-pixel-ratio: 1.1){.justice .justice-toggle:after{margin:10px}}.justice.closed .justice-toggle{opacity:1}.justice.closed .justice-toggle:after{background-color:#419ba3}\n" +
"";
  // cssText end

  var styleEl = document.createElement("style");
  document.getElementsByTagName("head")[0].appendChild(styleEl);
  if (styleEl.styleSheet) {
      if (!styleEl.styleSheet.disabled) {
          styleEl.styleSheet.cssText = cssText;
      }
  } else {
      try {
          styleEl.innerHTML = cssText
      } catch(e) {
          styleEl.innerText = cssText;
      }
  }

/* Begin: src/js/justice.cache.js */
  // these should all be in a settings hash
  var primaryColor = "rgb(241, 250, 195)";
  var secondaryColor = "rgb(48, 48, 48)";
  var failColor = "rgb(206, 69, 45)";
  var warnColor = "rgb(212, 202, 61)";
  var passColor = "rgb(65, 155, 163)";

  // need to get a better waying of syncing these values with css
  var prefix = "justice";
  var maxWidth = 300;
  var maxHeight = 40;

  var fpsHeightScale = maxHeight / 60;
  var chartLabelOffset = 20;
  var maxHistory = maxWidth - chartLabelOffset;

  var lastTextUpdate = 0;
  var tickCount = 0;
  var timing = null;

  // Nodes
  var wrap = null;
  var domBarNode = null;

  // FPS
  var fpsRenderer = null;
  var dataFpsCurrent = 0;
  var dataFpsHistory = [];
  var dataFpsLastTime = null;

  var domDisplayChartFps = null;
  var domDisplayChartFpsCanvas = null;
  var domDisplayChartFpsCanvasCtx = null;


  // Text
  var domDisplayTextLoadTime = null;


  var defaultOptions = {
    metrics: {
      TTFB:             { budget: 200   },
      domInteractive:   { budget: 250   },
      domComplete:      { budget: 800   },
      firstPaint:       { budget: 1000  },
      pageLoad:         { budget: 2000  },
      requests:         { budget: 6     },
    },

    interface: {
      position: 'fixed',
      placement: 'bottom'
    },

    warnThreshold: 0.8,
    chartType: 'spline',
    showFPS: true
  };

  var options = {};


  // TO DO: break these into text: and chart:
  var availableMetrics = {
    pageLoad:         { id: prefix + '-load',         label: 'Load',        unitLabel: 'ms',  collector: getLoadTime        },
    firstPaint:       { id: prefix + '-paint',        label: 'Paint',       unitLabel: 'ms',  collector: getFirstPaint      },
    TTFB:             { id: prefix + '-ttfb',         label: 'TTFB',        unitLabel: 'ms',  collector: getTTFB            },
    domComplete:      { id: prefix + '-complete',     label: 'Complete',    unitLabel: 'ms',  collector: getDomComplete     },
    domInteractive:   { id: prefix + '-interactive',  label: 'Interactive', unitLabel: 'ms',  collector: getDomInteractive  },
    requests:         { id: prefix + '-requests',     label: 'Requests',    unitLabel: '',    collector: getNumRequests     },
    tracey:           { id: prefix + '-tracey',       label: 'Tracey',      unitLabel: '',    collector: getTraceyLink      },
    logs:             { id: prefix + '-logs',         label: 'Logs',        unitLabel: '',    collector: getLogLink         }
  }

  var activeMetrics = {};

/* End: src/js/justice.cache.js */
/* Begin: src/js/justice.mungers.js */
  function mergeOptions(userOpts) {
    var mergedOptions = {};
    var userOpts = userOpts || {};

    for (var k in defaultOptions) {
      mergedOptions[k] = defaultOptions[k];
    }

    for (var k in userOpts) {
      mergedOptions[k] = userOpts[k];
    }

    return mergedOptions;
  }


  function setActiveMetrics(options, activeMetrics, availableMetrics) {
    for (var k in options.metrics) {
      activeMetrics[k] = availableMetrics[k];
    }
  }/* End: src/js/justice.mungers.js */
/* Begin: src/js/justice.collectors.js */
  /////////////////////
  //   Collectors    //
  /////////////////////

  // load time
  function getLoadTime() {
    return timing.loadEventStart - timing.navigationStart;
  }

  // from first byte to dom complete
  function getDomComplete() {
    return timing.domComplete - timing.domLoading;
  }

  // from first byte to dom is interactive
  function getDomInteractive() {
    return timing.domInteractive - timing.domLoading;
  }

  function getFirstPaint() {
    var firstPaint = 0;
    if (window.chrome && window.chrome.loadTimes) {
      // Convert to ms
      firstPaint = window.chrome.loadTimes().firstPaintTime * 1000;
      firstPaint = firstPaint - (window.chrome.loadTimes().startLoadTime*1000);
      return firstPaint.toFixed(0);
    } else if (typeof window.performance.timing.msFirstPaint === 'number') {
      firstPaint = window.performance.timing.msFirstPaint;
      firstPaint = firstPaint - window.performance.timing.navigationStart;
      return firstPaint.toFixed(0);
    } else {
      return '¯\\_(ツ)_/¯';
    }
  }

  function getNumRequests() {
    // turn on the dom.enable_resource_timing in firefox about:config
    if (performance.getEntries) {
      return performance.getEntries().length;
    } else {
      return '¯\\_(ツ)_/¯';
    }
  }

  function getTraceyLink() {
    if (window.searchResultId) {
      return `<a href="http://numo-tracey.s3-website-eu-west-1.amazonaws.com/#/${window.searchResultId}">${window.searchResultId}</a>`;
    } else {
      return '¯\\_(ツ)_/¯';
    }
  }

  function getLogLink() {
    if (window.traceRequestId) {
      return `<a target="_blank" href="https://search-isearch-monitoring-twv4p4ddtbyezpwikubk4j4uoe.eu-west-1.es.amazonaws.com/_plugin/kibana/#/discover/Traceable-ID-Search?_g=()&_a=(columns:!(msg,traceable_id,name),filters:!(),index:'*',interval:auto,query:(query_string:(analyze_wildcard:!t,query:'-@message:%22$START%22%20AND%20-@message:%22$END%22%20AND%20-@message:%22$REPORT%22%20traceable_id:%22${window.traceRequestId}%22')),sort:!('@timestamp',desc))">${window.traceRequestId}</a>`;
    } else {
      return '¯\\_(ツ)_/¯';
    }
  }

  function getTTFB() {
    return timing.responseStart - timing.connectEnd;
  }

  // only tracks fps, doesn't handle rendering
  function trackFPS(time) {
    if (!dataFpsLastTime) {
      dataFpsLastTime = time;
    } else {
      var delta = (time - dataFpsLastTime) / 1000;
      var fps = 1 / delta;
      var fpsClipped = fps > 60 ? 60 : Math.floor(fps);
      dataFpsCurrent = fpsClipped;
      dataFpsHistory.push([fpsClipped, fpsClipped]);
      if (dataFpsHistory.length > maxHistory) {
        dataFpsHistory.shift();
      }
      dataFpsLastTime = time;
    }
  }
/* End: src/js/justice.collectors.js */
/* Begin: src/js/justice.render.js */
  /////////////////////
  // DOM interaction //
  /////////////////////

/* Begin: src/js/justice.render.utils.js */
  function getMetricRatingClass(metricValue, metricBudget) {
    var rating = '';

    if (metricValue > metricBudget) {
      rating = 'fail';
    } else if (metricValue > ( metricBudget * options.warnThreshold) ) {
      rating = 'warn';
    } else {
      rating = 'pass';
    }

    return rating;
  }

  function getSingleTextMetricHTML(metricKey, metric, budget) {
    var metricValue = metric.collector();
    var ratingClass = getMetricRatingClass(metricValue, budget);

    return [
      '<div class="' + prefix + '-metric" id="' + metric.id + '">',
        '<span class="' + prefix + '-title">' + metric.label + ': </span>',
        '<span class="' + prefix + '-text ' + ratingClass + '">' + metricValue + metric.unitLabel + '</span>',
      '</div>'
    ].join('');
  }

  function getAllTextMetricsHTML(metrics) {
    var textMetricsHTML = [];

    for (var k in activeMetrics ) {
      var html = getSingleTextMetricHTML( k, activeMetrics[k], options.metrics[k].budget );
      textMetricsHTML.push(html);
    }

    return '<div id="' + prefix + '-text-metrics" class="' + prefix + '-metric-wrap">' + textMetricsHTML.join('') + '</div>';
  }

  function getAllChartMetricsHTML() {
    var metricHTML = !options.showFPS ? '' : [
      '<div class="' + prefix + '-metric chart">',
        '<span class="' + prefix + '-title">FPS: </span>',
        '<canvas id="' + prefix + '-fps" class="' + prefix + '-canvas" height="' + maxHeight + '" width="' + maxWidth + '"></canvas>',
      '</div>'
    ].join('');

    return metricHTML;
  }


  // var defaultOptions = {
  //   metrics: {
  //     pageLoad: { budget: 1000 },
  //     domComplete: { budget: 800 },
  //     domInteractive: { budget: 200 },
  //     requests: { budget: 20 }
  //   },

  //   interface: {
  //     position: 'fixed',
  //     placement: 'bottom'
  //   },
  //
  //   chartType: 'spline'
  // };


  // TODO: remove all data munging from this area
  // put in a completely seperate thing
  // this shit should only handle rendering
  // this shit should not access non-local variables (pass in all the things)
  // anything called a "utils" should
    // not access external data
    // return a helpful value
    // get<SomeThing>

/* End: src/js/justice.render.utils.js */
/* Begin: src/js/justice.render.chart.js */
  function renderChartReset(ctx, canvas) {
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    renderChartLines(ctx);
    renderChartLabels(ctx);
    renderChartGradient(ctx);
  }

  function renderChartLabels(ctx) {
    var fontSize = 10;
    ctx.font = "600 " + fontSize + "px sans-serif";
    // no
    ctx.fillStyle = failColor;
    ctx.fillText(0, 0, maxHeight);
    // meh
    ctx.fillStyle = warnColor;
    ctx.fillText(30, 0, ((maxHeight / 2) + (fontSize / 2)));
    // wins internet
    ctx.fillStyle = passColor;
    ctx.fillText(60, 0, 0 + fontSize);
  }

  function renderChartGradient(ctx) {
    var grad = ctx.createLinearGradient(0,maxHeight,0,0);
    grad.addColorStop(0, failColor); // you crazy fool
    grad.addColorStop(0.25, failColor); // bad zone
    grad.addColorStop(0.5, warnColor); // warning
    grad.addColorStop(1, passColor); // da sweetness
    ctx.strokeStyle = grad;
    ctx.fillStyle = grad;
  }

  function renderChartLines(ctx) {
    for (var i = 0; i < 3; i++) {
      var top = ((maxHeight / 2) * i) + 0.5 - (i === 2 ? 1 : 0);
      ctx.beginPath();
      ctx.moveTo(0.5 + chartLabelOffset, top);
      ctx.lineTo(maxWidth + 0.5, top);
      ctx.lineWidth = 1;
      ctx.strokeStyle = secondaryColor;
      ctx.stroke();
    }
  }

  function getFpsRenderer(chartType) {
    var chartRenderer = null;

    if (chartType === 'spline') {
      chartRenderer = renderChartSplineType;
    } else if (chartType === 'dots') {
      chartRenderer = renderChartDotsType;
    }

    return chartRenderer;
  }

  function renderChartDotsType(ctx, canvas, data) {
    renderChartReset(ctx, canvas);
    for (var i = 0; i < data.length; i++) {
      var scaledHeight = ((60 - data[i][1]) * fpsHeightScale);
      ctx.fillRect( (data.length - i) + chartLabelOffset, scaledHeight, 1.5, 1.5);
    }
  }

  function renderChartSplineType(ctx, canvas, data) {
    renderChartReset(ctx, canvas);

    ctx.beginPath();
    var startHeight = data.length > 0 ? data[data.length] : 0;
    ctx.moveTo(0, startHeight);

    for (var i = 0; i < data.length; i++) {
      var left = (i === 0 ? 0 : i);
      var scaledHeight = ((60 - data[i][1]) * fpsHeightScale);
      ctx.lineTo((data.length - left) + chartLabelOffset, scaledHeight);
    }

    ctx.lineWidth = 1;
    ctx.stroke();
  }

/* End: src/js/justice.render.chart.js */


  function cacheLookups() {
    domDisplayChartFpsCanvas = document.getElementById(prefix + '-fps')
    domDisplayChartFpsCanvasCtx = domDisplayChartFpsCanvas.getContext('2d');
  }


  function renderUI() {
    var stateClass = getState();
    wrap = document.createElement('div');
    wrap.id = prefix;
    wrap.classList.add(prefix);
    wrap.classList.add(stateClass);
    document.body.appendChild(wrap);
    wrap = document.getElementById(prefix)

    wrap.innerHTML = [
      '<div id="' + prefix + '-toggle" class="' + prefix + '-toggle"></div>',
      getAllTextMetricsHTML(),
      getAllChartMetricsHTML()
    ].join('');

    if (options.showFPS) {
      cacheLookups();
    }
    attachListeners();
  }


  function renderText() {
    var html = getAllTextMetricsHTML(activeMetrics);
    var textWrapper = document.getElementById(prefix + '-text-metrics');
    textWrapper.innerHTML = html;
  }


  function attachListeners() {
    document.getElementById(prefix + '-toggle').onclick = function() {
      var e = document.getElementById(prefix);

      if (e.className.match(' closed')) {
        e.className = e.className.replace(' closed', '')
        setState('open');
      } else {
        e.className += ' closed';
        setState('closed')
      }

    }
  }


  function setState(state) {
    if (!window.localStorage) return;
    window.localStorage.setItem(prefix + '-state', state);
  }


  function getState() {
    if (!window.localStorage) return;
    return window.localStorage.getItem(prefix + '-state') || 'open';
  }
/* End: src/js/justice.render.js */

  // main tick function that calls everything else
  function tick(time) {
    tickCount++;

    if (options.showFPS) {
      trackFPS(time);
      fpsRenderer(
        domDisplayChartFpsCanvasCtx,
        domDisplayChartFpsCanvas,
        dataFpsHistory
      );
    }

    if (lastTextUpdate === null) {
      lastTextUpdate = time;
    } else if (time - lastTextUpdate > 3000) {
      lastTextUpdate = time;
      renderText();
    }

    window.requestAnimationFrame(tick);
  }

  function seriouslyInit(opts) {
    timing = window.performance.timing;
    options = mergeOptions(opts);
    setActiveMetrics(options, activeMetrics, availableMetrics);
    renderUI();
    fpsRenderer = getFpsRenderer(options.chartType);
    window.requestAnimationFrame(tick);
  }

  return {
    init: function(opts) {
      if ('performance' in window && 'timing' in window.performance) {
        if (document.readyState === 'complete') {
          seriouslyInit(opts, 'already loaded');
        } else {
          window.onload = function() { seriouslyInit(opts) };
        }
      } else {
        console.log("Justice: performance api not supported in this browser, initialization stopped.")
      }
    }
  }

};

module.exports = Justice;
