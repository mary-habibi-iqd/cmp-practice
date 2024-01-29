/* ---------------------------------------------- *	template info and building dynamic keyword * ---------------------------------------------- */
var cmsObject = cmsObject || window.polygon.cmsObject;
window.tile2IsRendered = false;
window.competingSpecialAd = true;
window.tile1Rendering = false;
window.tile111Special = false;

let IQD_varPackCustom = {
    iqdSite: "iqtestunit",
    iqdSiteWrapper: "iqd_topAd",
    iqdSiteInfo: [
        [
            1020,
            0,
            0
        ],
        [
            0,
            0,
            1020
        ],
        [
            0,
            0,
            1020
        ],
        [
            'center',
            'fullBodyBg'
        ],
        [
            'y',
            'y',
            'y'
        ]
    ],
    initialLoadedAdTiles: ["iqadtile53", "iqadtile15"],
    rotationControl: {prefix: 'SPON'},
    adSlotLabelCss: {
        cssSitebar: "content: 'Anzeige';position: relative;display: block;width: 100%; max-width: 1000px; margin: 0 auto;font-size: 12px;text-indent: 0.5rem; text-transform: uppercase; font-family: SPIEGEL Sans UI, Arial, Verdana, Helvetica, sans-serif;line-height: 32px; white-space: nowrap; color: #807E7C;}",
        cssStickyBB: "content: 'Anzeige';position: relative;display: block;width: 100%; max-width: 1000px; margin: 0 auto;font-size: 12px;text-indent: 0.5rem; text-transform: uppercase; font-family: SPIEGEL Sans UI, Arial, Verdana, Helvetica, sans-serif;line-height: 32px; white-space: nowrap; color: #807E7C; background-color: #F1EFED;}"
    },
    outsideTop: parseInt(0),
    outsideLeft: parseInt(0),
    outsideRight: parseInt(0),
    outsideSafeArea: parseInt(10),
    outsideBottom: 'auto',
    intersectionElements: {
        header: 'header',
        headerInitial: 'nav',
        footer: 'footer'
    },
    headerStickyDetector: '.is-headerbar-collapsed',
    availableInnerHeight: window.innerHeight,
    availableInnerHeightPur: window.innerHeight
};


window.IQD_varPack = Object.assign({}, IQD_varPackCustom, window.IQD_varPackGlobal);

/* Override standard  window.IQD_varPack.adSlotLabel values für tile1,111,20,21 */
window.IQD_varPack.adSlotLabel['iqadtile1'] = false;
window.IQD_varPack.adSlotLabel['iqadtile111'] = false;
window.IQD_varPack.adSlotLabel['iqadtile21'] = false;
window.IQD_varPack.adSlotLabel['iqadtile20'] = false;

const header = document.querySelector(window.IQD_varPack.intersectionElements.header);
const footer = document.querySelector(window.IQD_varPack.intersectionElements.footer);
const level2 = window.IQD.AdController.ExecutionContext.prototype.cvars.level2,
handle = AdController._handle;
let adTile;
window.adsRendered = [];

AdController.getEventDispatcher().on('after_initialization', function (AfterInitializationEvent) {
    window.consoleOutput('%c[iqd] - local.js - IQ - AfterInitializationEvent', 'background-color: green; color: white;');
});
AdController.getEventDispatcher().on('after_reinitialization', function (AfterReinitializationEvent) {
    window.consoleOutput('%c[iqd] - local.js - IQ - AfterReinitializationEvent', 'background-color: green; color: white;');
});
AdController.getEventDispatcher().on('render_controller', function (RenderControllerEvent) {


    window.consoleOutput('%c[iqd] - local.js - render_controller', 'background-color: red; color: white;');

    adTile = RenderControllerEvent.getPositionKey();
    let firstTile = (AdController._handle === "homepage") ? 'iqadtile111' : 'iqadtile1';

    window.IQD_varPack.renderAfterDaisyBit = window.IQD_varPack.renderAfterDaisyBit || {};
    const weHaveDaisyBit = ((IQGDPR_handle.cmp === "true" && window.gotDaisyBit == true) || IQGDPR_handle.cmp === "false");
      if (!weHaveDaisyBit) {
        window.consoleOutput('%c[iqd] - local.js - render_controller got no daisybit', 'background-color: red; color: white;');
      }
    if (weHaveDaisyBit) {
      
        window.consoleOutput('%c[iqd] - local.js - render_controller got the daisybit', 'background-color: green; color: white;');
        window.consoleOutput('%c[iqd] - local.js - IQ - adsRendered', 'background-color: green; color: white;', adsRendered);
        if (adsRendered.indexOf(adTile) < 0) {
            if (adTile === firstTile) {
                if (RenderControllerEvent.isFirstInvocation() && RenderControllerEvent.allowsDeferring()) {
                    return RenderControllerEvent.wait(RenderControllerEvent.createMutex(2000, function () {
                        window.consoleOutput('%c[iqd] - local.js - IQ - RenderControllerEvent - wait - ' + adTile, 'background: #222; color: #ffffff');
                        return typeof window.delayedData !== 'undefined';
                    }));
                } else {
                  
                    window.consoleOutput('%c[iqd] - local.js - IQ - RenderControllerEvent - render - ' + adTile, 'background: #222; color: #ffffff');
                    adsRendered.push(adTile);
                    return RenderControllerEvent.now();
                }
            } else if (AdController._handle === "homepage" && adTile === 'iqadtile1' && !window.tile1Rendering) {
                return RenderControllerEvent.skip();
            } else if (adTile === 'iqadtile20' && !window.tile2IsRendered) {
                window.consoleOutput('%c[iqd] - local.js - IQ - RenderControllerEvent - skip - ' + adTile, 'background: #222; color: #ffffff');
                return RenderControllerEvent.skip();
            } else if (adTile === 'iqadtile21' && !window.tile2IsRendered) {
                window.consoleOutput('%c[iqd] - local.js - IQ - RenderControllerEvent - skip - ' + adTile, 'background: #222; color: #ffffff');
                return RenderControllerEvent.skip();
            }
            else {
                window.consoleOutput('%c[iqd] - local.js - IQ - RenderControllerEvent - render - ' + adTile, 'background: #222; color: #ffffff');
                adsRendered.push(adTile);
                return RenderControllerEvent.now();
            }
        } else {
            window.consoleOutput('%c[iqd] - local.js - IQ - adTile is already been rendered', 'background-color: green; color: white;');
            return RenderControllerEvent.skip();
        }

    } else {
        window.IQD_varPack.renderAfterDaisyBit[RenderControllerEvent.getPositionKey()] = "skip";
        window.consoleOutput('%c[iqd] - local.js - IQ - RenderControllerEvent - skip - ' + adTile, 'background: #222; color: #ffffff');
        return RenderControllerEvent.skip();
    }

});
/* --------- tile20/tile21  ---------- */
const setSkyFixed = () => {
    const alignAd = document.querySelector("#iqd_align_Ad");

    let rightAd,
        leftAd;
    if (alignAd) {
        rightAd = document.body.scrollWidth - parseFloat(alignAd.getBoundingClientRect().left) + parseInt(10),
        leftAd = parseFloat(alignAd.getBoundingClientRect().right) + parseInt(10);
        document.querySelector("#iqd_leftAd").style.right = rightAd + 'px';
        document.querySelector("#iqd_rightAd").style.left =leftAd+'px';
        window.IQD_varPack.outsideRight = rightAd;
        window.IQD_varPack.outsideLeft = leftAd;
    }
}

const setSkyTop = () => {

  const leftAd = document.querySelector("#iqd_leftAd");

  const rightAd = document.querySelector("#iqd_rightAd")

  // const labelHeight = (document.querySelector("#iqadtile1")) ? window.getComputedStyle(document.querySelector("#iqadtile1"), ':before').getPropertyValue('line-height') : parseInt(0,10);
    if (leftAd && rightAd) {

        

        if( parseFloat(document.querySelector("#iqd_topAd").getBoundingClientRect().top) >= 0) {
            window.IQD_varPack.outsideTop =  parseFloat(document.querySelector("#iqd_topAd").getBoundingClientRect().top);
            leftAd.style.top = rightAd.style.top =   window.IQD_varPack.outsideTop + 'px';
        }
        else if(document.querySelector(".is-headerbar-collapsed")) {
            window.IQD_varPack.outsideTop = parseFloat(document.querySelector("header").getBoundingClientRect().bottom);
            leftAd.style.top = rightAd.style.top = window.IQD_varPack.outsideTop  + 'px';
        }
    }
}


const setSkyHeight = () =>  {
    if( document.querySelector('[data-placement^="pos_header desktop"]') ){
      if(parseFloat(document.querySelector('[data-placement^="pos_header desktop"]').getBoundingClientRect().top) >= 0){
          window.IQD_varPack.availableInnerHeight = window.IQD_varPack.availableInnerHeightPur = parseFloat(window.innerHeight) - parseFloat(document.querySelector('[data-placement^="pos_header desktop"]').getBoundingClientRect().top) - parseInt(8);

      } else {
          window.IQD_varPack.availableInnerHeight = window.IQD_varPack.availableInnerHeightPur = parseFloat(window.innerHeight) - parseFloat(document.querySelector('#header-bar').getBoundingClientRect().bottom);

      }
    }
  }


function triggerPos1Observer(){
var observer = new MutationObserver(function(mutations) {
    mutations.forEach(function(mutation) {
        if(mutation.attributeName === 'data-placement'){
            setSkyTop();
            setSkyHeight();
        }
    });
});

    // Notify me of style changes for iqd_rightAd
    var observerConfig = {
        attributes: true,
        attributeFilter: ["data-placement"]
    };

    const targetNode = document.querySelector('[data-placement^="pos_1"]');

    observer.observe(targetNode, observerConfig);
}
let itmst0;
const acLast = () => {
    const itm = document.body || false;
    if (itm) {
      let  mys = document.createElement('script');
        mys.type = 'text/javascript';
        mys.innerHTML = 'var IQDComplete = {init: function () {return true;}};if(typeof AdController !== "undefined"){AdController.finalize();}';
        itm.appendChild(mys);

        clearInterval(itmst0);
    }
};
itmst0 = setInterval(acLast, 200);

const acTopBanner = () => {
    const itm = document.querySelector("#iqd_topAd") || false;
    if (itm) {
        setSkyTop();
        setSkyFixed();
        setSkyHeight();
        clearInterval(itmst);
    }
}
const itmst = setInterval(acTopBanner, 200);

/* ### Reload-Handle ### */
window.IQD_ReloadHandle = () => {
    window.consoleOutput('%c[iqd] - local.js - IQ - ReloadHandle', 'background-color: red; color: white;');

    window.consoleOutput('%c[iqd] - local.js - IQ - ReloadHandle', 'background-color: green; color: white;');

    window.adsRendered = [];
    const letsClrTheTPL = window.IQD_varPack.hasOwnProperty('tplfn2clr') && window.IQD_varPack.tplfn2clr.hasOwnProperty('length');
    if (letsClrTheTPL) {
   
        let tmpObj, pObj, pType, pFn;
        while (tmpObj = window.IQD_varPack.tplfn2clr.pop()) {
            pObj = tmpObj[0];
            pType = tmpObj[1];
            pFn = tmpObj[2];
            window.IQD_varPack.removeEvent(pObj, pType, pFn);

        }
    } 

    if (window.IQD_varPack.hasOwnProperty('fn2clr') && window.IQD_varPack.fn2clr.hasOwnProperty('length')) {
        let tmpObj2, pObj2, pType2, pFn2;
        while (tmpObj2 = window.IQD_varPack.fn2clr.pop()) {
            pObj2 = tmpObj2[0];
            pType2 = tmpObj2[1];
            pFn2 = tmpObj2[2];
            window.IQD_varPack.removeEvent(pObj2, pType2, pFn2);

        }
    }

    if (document.querySelector('#iqStyleContainer')) {
        const _domIqStyleContainerChildren = document.querySelector('#iqStyleContainer').childNodes;
        let _child = [];
        for (let i = 0; i < _domIqStyleContainerChildren.length; i++) {
            if (typeof (_domIqStyleContainerChildren[i]) === 'object') {
                _child.push(_domIqStyleContainerChildren[i]);
            }
        }
        for (let j = 0; j < _child.length; j++) {
            document.querySelector('#iqStyleContainer').removeChild(_child[j]);
        }

    }


    for (let i = 0, l = window.IQD_varPack.adReloadHandle.length; i < l; i++) {
        if (window.IQD_varPack.adReloadHandle[i]['setComputedStyles'] == 'true') {
            if (window.IQD_varPack.adReloadHandle[i].adNodes.length >= 0) {
                window.consoleOutput('%c[iqd] - local.js - ### ' + window.IQD_varPack.adReloadHandle[i].adNodes.length, 'background-color: green; color: white;');
                for (let j = 0, k = window.IQD_varPack.adReloadHandle[i].adNodes.length; j < k; j++) {
                    window.consoleOutput('%c[iqd] - local.js - window.IQD_varPack.adReloadHandle[i]', 'background-color: green; color: white;', window.IQD_varPack.adReloadHandle[i]);
                    if (document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j])) {
                        window.consoleOutput('%c[iqd] - local.js - document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j])', 'background-color: green; color: white;', document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j]));
                        document.getElementById(window.IQD_varPack.adReloadHandle[i].adNodes[j]).remove();
                    }
                }
            }
            document.body.style.backgroundImage = '';
            document.body.style.background = '';
        }
    }


    if (document.getElementById('iqadtile21')) {
        document.getElementById('iqadtile21').removeAttribute('style');
    }
    if (document.getElementById('iqadtile20')) {
        document.getElementById('iqadtile20').removeAttribute('style');
    }
    if (document.getElementById('iqadtile1')) {
        document.getElementById('iqadtile1').removeAttribute('style');
    }

    window.IQD_varPack.removeAllIqSlotClasses();

   // window.IQD_varPack.iqd_TestKW = '';
    window.tile2IsRendered = false;
    window.competingSpecialAd = true;
    window.tile1Rendering = false;
    window.tile111Special = false;
    window.IQD_varPack.adReloadHandle = [];
    window.IQD_varPack.ausbuchung = {};
    window.IQD_varPack.ad = {};

    window.IQDAO.cridCache = [];

    for (let prop in iqacposobj) {
        if (iqacposobj[prop].enabled) {
            let di = iqacposobj[prop].dom_id;
            window.IQD_varPack.adSlotLabel[di] = true;
        }
    }
    if (window.IQD_varPack.iqd_TestKW === 'iqviewadplace') {
        window.setIqViewPlaceStyles();
      }
    AdController.reinitialize(cmsObject);
    AdController.startLoadCycle();
    window.assignIqadtileInViewObserver();
    setEvents();

};

const startReload = (event) => {

    try {
        if (true) {

            if (event.data == "iq_refresh_ads") {
         

                window.consoleOutput('%c[iqd] - local.js - IQ - receive iq_refresh_ads', 'background-color: green; color: white;');
                window.IQD_ReloadHandle();
            }

            if (event.data == "iq_create_dynamic_positions") {
     
                window.consoleOutput('%c[iqd] - local.js - IQ - receive iq_create_dynamic_positions', 'background-color: green; color: white;');
                window.createDynamicPositions();
              window.assignIqadtileInViewObserver();
            }

              if (event.data == "iq_remove_dynamic_positions") {
      
                window.consoleOutput('%c[iqd] - local.js - IQ - receive iq_remove_dynamic_positions', 'background-color: green; color: white;');
               window.deleteDynamicPositions();
            }
        }
    } catch (e) { }
};


 /* receive messages from publisher */
 const setEvents = () => {

    window.consoleOutput('%c[iqd] - local.js - IQ - setEvents', 'background-color: red; color: white;');
    window.IQD_varPack.addEvent(window, "resize", function () { setSkyFixed(); setSkyHeight();});
    window.IQD_varPack.addEvent(window, "scroll", function () {

        setSkyTop();
        setSkyHeight();

    });
   const headerBar = document.querySelector("#header-bar");

    if(headerBar ){
        headerBar.addEventListener("transitionend", () => {
            setSkyTop();
            setSkyHeight();
        });
        headerBar.addEventListener("transitionstart", () => {
            setSkyTop();
            setSkyHeight();
        });
    }
    window.addEventListener("message", startReload);
    triggerPos1Observer();
  };
  setEvents();

/* ### End Reload-Handle ### */