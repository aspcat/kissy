﻿/*
Copyright 2013, KISSY UI Library v1.40dev
MIT Licensed
build time: Jun 19 14:00
*/
/*
 Combined processedModules by KISSY Module Compiler: 

 component/base/manager
*/

/**
 * @ignore
 * storage for component
 * @author yiminghe@gmail.com
 */
KISSY.add("component/base/manager", function () {

    var basePriority = 0,
        uis = {
            // 不带前缀 prefixCls
            /*
             "menu" :{
             priority:0,
             constructor:Menu
             }
             */
        },
        componentInstances = {};

    /**
     * @class KISSY.Component.Manager
     * @member Component
     * @singleton
     * Manage component metadata.
     */
    return {

        __instances: componentInstances,

        /**
         * associate id with component
         * @param {String} id
         * @param {KISSY.Component.Controller} component
         */
        addComponent: function (id, component) {
            componentInstances[id] = component;
        },

        /**
         * remove association id with component
         * @param {String} id
         */
        removeComponent: function (id) {
            delete componentInstances[id];
        },

        /**
         * get component by id
         * @param {String} id
         * @return {KISSY.Component.Controller}
         */
        'getComponent': function (id) {
            return componentInstances[id];
        },

        /**
         * Create a component instance using json with xclass.
         * @param {Object|KISSY.Component.Controller} component Component's json notation with xclass attribute.
         * @param {String} component.xclass Component to be newed 's xclass.
         * @param {KISSY.Component.Controller} parent Component From which new component generated will inherit prefixCls
         * if component 's prefixCls is undefined.
         * @member KISSY.Component
         * @return KISSY.Component.Controller
         *
         *  for example:
         *
         *      create({
     *          xclass:'menu',
     *          children:[{
     *              xclass:'menuitem',
     *              content:"1"
     *          }]
     *      })
         */
        'createComponent':function(component, parent){
            var ChildConstructor,
                xclass;
            if (component) {
                if (!component.isController && parent) {
                    S.mix(component, parent.get('defaultChildCfg'), false);
                    if (!component.xclass && component.prefixXClass) {
                        component.xclass = component.prefixXClass;
                        if (component.xtype) {
                            component.xclass += '-' + component.xtype;
                        }
                    }
                }
                if (!component.isController && (xclass = component.xclass)) {
                    ChildConstructor = getConstructorByXClass(xclass);
                    if (!ChildConstructor) {
                        S.error("can not find class by xclass desc : " + xclass);
                    }
                    component = new ChildConstructor(component);
                }
                if (component.isController && parent) {
                    component.setInternal('parent', parent);
                }
            }
            return component;
        },

        /**
         * Get css class name for this component constructor.
         * @param {Function} constructor Component's constructor.
         * @return {String}
         * @method
         */
        getXClassByConstructor:  function (constructor) {
            for (var u in uis) {
                var ui = uis[u];
                if (ui.constructor == constructor) {
                    return u;
                }
            }
            return '';
        },
        /**
         * Get component constructor by css class name.
         * @param {String} classNames Class names separated by space.
         * @return {Function}
         * @method
         */
        getConstructorByXClass: function getConstructorByXClass(classNames) {
            var cs = classNames.split(/\s+/),
                p = -1,
                t,
                i,
                uic,
                ui = null;
            for (i = 0; i < cs.length; i++) {
                uic = uis[cs[i]];
                if (uic && (t = uic.priority) > p) {
                    p = t;
                    ui = uic.constructor;
                }
            }
            return ui;
        },
        /**
         * Associate css class with component constructor.
         * @param {String} className Component's class name.
         * @param {Function} ComponentConstructor Component's constructor.
         * @method
         */
        setConstructorByXClass: function (className, ComponentConstructor) {
            uis[className] = {
                constructor: ComponentConstructor,
                priority: basePriority++
            };
        }
    };
});
