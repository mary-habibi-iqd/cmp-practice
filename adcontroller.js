/* global AdController */
"use strict";
(function () {
  const cmsObject = {
    $handle: "homepage",
    level2: "",
    level3: "",
    level4: "",
    isWrapperApp: false,
    keywords: "mary_journal,homepage",
    tma: "",
    platform: "desktop",
  };

  const addControllerProxy = {
    i: null, // page info
    q: [], // render queue
    f: false, // is finalized
    s: false, // is staged
    n: false, // is initialized
    r: null, // ready function
    c: [], // command queue

    setPageInfo: function (i) {
      window.AdController.i = i;
    },
    stage: function () {
      window.AdController.s = true;
    },
    initialize: function () {
      window.AdController.n = true;
    },
    render: function (n, c) {
      window.AdController.q.push([n, c]);
    },
    finalize: function () {
      window.AdController.f = true;
    },
    ready: function (callback) {
      window.AdController.r = callback;
    },
    startLoadCycle: function () {
      window.AdController.c.push(["startLoadCycle"]);
    },
    reload: function (p, t) {
      window.AdController.c.push(["reload", p, t]);
    },
    reinitialize: function (i) {
      window.AdController.c.push(["reinitialize", i]);
    },
  };

  window.AdController = addControllerProxy;

  const scriptLoadedSucessfully = IQSLoader(IQD_script_url("cdn_mary_journal"));
  if (!scriptLoadedSucessfully) {
    console.error("Adcontroller could not be fetched and loaded");
    return;
  }

  const adControllerIsIntialized = AdController._initialized;
  if (adControllerIsIntialized) {
    console.log("already initialized");
    checkDOMReadyState();
  } else {
    console.info("not yet intitialized");
    AdController.setPageInfo(cmsObject);
    try {
      AdController.stage();
    } catch (e) {
      console.error(e);
    }
    AdController.initialize();
  }

  document.addEventListener("DOMContentLoaded", finalizeAdController);

  /**
   * Dynamically loads a script by url - 
   *
   * @param {string} url - The location of the script to load
   */
  function IQSLoader(url) {
    if (!url) {
      return null;
    }
    const script = document.createElement("script");
    script.type = "text/javascript";
    script.src = url;

    document.head.appendChild(script);

    return true;
  }

  /**
   * Checks of the query parameter iqdeployment to see if it's a test or live mode.
   *
   * @returns a custom keyword if iqdeployment is set or "live"
   */
  // eslint-disable-next-line no-unused-vars
  function IQD_deploy_mode(siteUrl) {
    const urlHasDeploymentParameter = siteUrl.indexOf("iqdeployment=") > 1;

    if (urlHasDeploymentParameter) {
      return siteUrl.split("iqdeployment=")[1].split("&")[0];
    } else {
      return "live";
    }
  }

  function IQD_script_url(cdn_partnersite) {
    if (!cdn_partnersite) {
      return null;
    }

    // const iqd_mode = IQD_deploy_mode(window.location.href.toLowerCase());
    const iqd_mode = "sbxmary";

    const url =
      "https://s3.eu-central-1.amazonaws.com/prod.iqdcontroller.iqdigital/" +
      cdn_partnersite +
      "/" +
      iqd_mode +
      "/iqadcontroller.js.gz ";
    return url;
  }

  function checkDOMReadyState(c) {
    try {
      if (AdController.getRenderController().isReady()) {
        AdController.reinitialize(cmsObject);
      }
    } catch (e) {
      if (c < 50) {
        c++;
        setTimeout(function () {
          checkDOMReadyState(c);
        }, 100);
      }
    }
  }

  function finalizeAdController() {
    AdController.finalize();

    window.IQDComplete = {
      init: function () {
        return true;
      },
    };
  }
})();
