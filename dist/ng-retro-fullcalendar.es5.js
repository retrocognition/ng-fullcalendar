import { Component, ElementRef, EventEmitter, Input, NgModule, NgZone, Output } from '@angular/core';
import $ from 'jquery';
import 'fullcalendar';

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
(function () {
    /**
     * @param {?} event
     * @param {?} params
     * @return {?}
     */
    function CustomEvent(event, params) {
        params = params || { bubbles: false, cancelable: false, detail: undefined };
        var /** @type {?} */ evt = /** @type {?} */ (document.createEvent('CustomEvent'));
        evt.initCustomEvent(event, params.bubbles, params.cancelable, params.detail);
        return evt;
    }
    
    CustomEvent.prototype = Event.prototype;
    window.CustomEvent = /** @type {?} */ (CustomEvent);
})();

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var CalendarComponent = /** @class */ (function () {
    function CalendarComponent(element, zone) {
        this.element = element;
        this.zone = zone;
        this._reRender = true;
        this.eventsModelChange = new EventEmitter();
        this.eventDrop = new EventEmitter();
        this.eventResize = new EventEmitter();
        this.eventClick = new EventEmitter();
        this.clickButton = new EventEmitter();
        this.windowResize = new EventEmitter();
        this.viewRender = new EventEmitter();
        this.viewDestroy = new EventEmitter();
        this.eventRender = new EventEmitter();
        this.initialized = new EventEmitter();
        this.select = new EventEmitter();
        this.unselect = new EventEmitter();
        this.dayClick = new EventEmitter();
        this.navLinkDayClick = new EventEmitter();
        this.navLinkWeekClick = new EventEmitter();
    }
    Object.defineProperty(CalendarComponent.prototype, "eventsModel", {
        get: /**
         * @return {?}
         */
        function () {
            return this._eventsModel;
        },
        set: /**
         * @param {?} value
         * @return {?}
         */
        function (value) {
            var _this = this;
            this._eventsModel = value;
            if (this._reRender) {
                setTimeout(function () {
                    _this.renderEvents(value);
                }, 50);
            }
            else {
                this._reRender = true;
            }
        },
        enumerable: true,
        configurable: true
    });
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngOnInit = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngAfterViewInit = /**
     * @return {?}
     */
    function () {
        var _this = this;
        setTimeout(function () {
            _this.updaterOptions();
            _this.zone.runOutsideAngular(function () {
                $(_this.element.nativeElement).fullCalendar(_this.options);
                _this._eventsModel = /** @type {?} */ (_this.options.events);
                _this.eventsModelChange.next(_this.options.events);
                _this.initialized.emit(true);
                // Click listeners
                var /** @type {?} */ elem = document.getElementsByTagName('ng-fullcalendar');
                $('[class ^="fc"][class *="button"]').click(function (el) {
                    var /** @type {?} */ classnames = el.currentTarget.className.split(' ');
                    classnames.forEach(function (name) {
                        if (name.indexOf('button') === name.length - 6) {
                            name = name.replace(/fc|button|-/g, '');
                            if (name !== '') {
                                _this.renderEvents(_this._eventsModel);
                                eventDispatch(name);
                            }
                        }
                    });
                });
                /**
                 * @param {?} buttonType
                 * @return {?}
                 */
                function eventDispatch(buttonType) {
                    var /** @type {?} */ data = $('ng-fullcalendar').fullCalendar('getDate');
                    var /** @type {?} */ currentDetail = {
                        buttonType: buttonType,
                        data: data
                    };
                    var /** @type {?} */ widgetEvent = new CustomEvent('clickButton', {
                        bubbles: true,
                        detail: currentDetail
                    });
                    for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                        elem[i].dispatchEvent(widgetEvent);
                    }
                }
            });
        });
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngAfterContentChecked = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.ngAfterViewChecked = /**
     * @return {?}
     */
    function () {
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.updateEventsBeforeResize = /**
     * @return {?}
     */
    function () {
        var /** @type {?} */ events = this.fullCalendar('clientEvents');
        this._reRender = false;
        this.eventsModel = events;
        this.eventsModelChange.next(events);
    };
    /**
     * @return {?}
     */
    CalendarComponent.prototype.updaterOptions = /**
     * @return {?}
     */
    function () {
        var _this = this;
        var /** @type {?} */ elem = document.getElementsByTagName('ng-fullcalendar');
        this.options.eventDrop = function (event, duration) {
            var /** @type {?} */ detail = { event: event, duration: duration };
            var /** @type {?} */ widgetEvent = new CustomEvent('eventDrop', {
                bubbles: true,
                detail: detail
            });
            _this.updateEventsBeforeResize();
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.eventResize = function (event, duration) {
            var /** @type {?} */ detail = { event: event, duration: duration };
            var /** @type {?} */ widgetEvent = new CustomEvent('eventResize', {
                bubbles: true,
                detail: detail
            });
            _this.updateEventsBeforeResize();
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.eventRender = function (event, element, view) {
            var /** @type {?} */ detail = { event: event, element: element, view: view };
            var /** @type {?} */ widgetEvent = new CustomEvent('eventRender', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.eventClick = function (event) {
            var /** @type {?} */ detail = { event: event, duration: null };
            var /** @type {?} */ widgetEvent = new CustomEvent('eventClick', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.windowResize = function (view) {
            var /** @type {?} */ detail = { view: view };
            var /** @type {?} */ widgetEvent = new CustomEvent('windowResize', {
                bubbles: true,
                detail: detail
            });
            if (elem && elem[0]) {
                for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                    elem[i].dispatchEvent(widgetEvent);
                }
            }
        };
        this.options.viewRender = function (view, element) {
            var /** @type {?} */ detail = { view: view, element: element };
            var /** @type {?} */ widgetEvent = new CustomEvent('viewRender', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.viewDestroy = function (view, element) {
            var /** @type {?} */ detail = { view: view, element: element };
            var /** @type {?} */ widgetEvent = new CustomEvent('viewDestroy', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.select = function (start, end, jsEvent, view, resource) {
            var /** @type {?} */ detail = { start: start, end: end, jsEvent: jsEvent, view: view, resource: resource };
            var /** @type {?} */ widgetEvent = new CustomEvent('select', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.unselect = function (view, jsEvent) {
            var /** @type {?} */ detail = { view: view, jsEvent: jsEvent };
            var /** @type {?} */ widgetEvent = new CustomEvent('unselect', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.dayClick = function (date, jsEvent, view) {
            var /** @type {?} */ detail = { date: date, jsEvent: jsEvent, view: view };
            var /** @type {?} */ widgetEvent = new CustomEvent('dayClick', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.navLinkDayClick = function (date, jsEvent) {
            var /** @type {?} */ detail = { date: date, jsEvent: jsEvent };
            var /** @type {?} */ widgetEvent = new CustomEvent('navLinkDayClick', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.navLinkWeekClick = function (weekStart, jsEvent) {
            var /** @type {?} */ detail = { weekStart: weekStart, jsEvent: jsEvent };
            var /** @type {?} */ widgetEvent = new CustomEvent('navLinkWeekClick', {
                bubbles: true,
                detail: detail
            });
            for (var /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
    };
    /**
     * @param {...?} args
     * @return {?}
     */
    CalendarComponent.prototype.fullCalendar = /**
     * @param {...?} args
     * @return {?}
     */
    function () {
        var args = [];
        for (var _i = 0; _i < arguments.length; _i++) {
            args[_i] = arguments[_i];
        }
        if (!args) {
            return;
        }
        switch (args.length) {
            case 0:
                return;
            case 1:
                return $(this.element.nativeElement).fullCalendar(args[0]);
            case 2:
                return $(this.element.nativeElement).fullCalendar(args[0], args[1]);
            case 3:
                return $(this.element.nativeElement).fullCalendar(args[0], args[1], args[2]);
        }
    };
    /**
     * @param {?} event
     * @return {?}
     */
    CalendarComponent.prototype.updateEvent = /**
     * @param {?} event
     * @return {?}
     */
    function (event) {
        return $(this.element.nativeElement).fullCalendar('updateEvent', event);
    };
    /**
     * @param {?} idOrFilter
     * @return {?}
     */
    CalendarComponent.prototype.clientEvents = /**
     * @param {?} idOrFilter
     * @return {?}
     */
    function (idOrFilter) {
        return $(this.element.nativeElement).fullCalendar('clientEvents', idOrFilter);
    };
    /**
     * @param {?} events
     * @return {?}
     */
    CalendarComponent.prototype.renderEvents = /**
     * @param {?} events
     * @return {?}
     */
    function (events) {
        $(this.element.nativeElement).fullCalendar('removeEvents');
        if (events && events.length > 0) {
            $(this.element.nativeElement).fullCalendar('renderEvents', events, true);
            $(this.element.nativeElement).fullCalendar('rerenderEvents');
        }
    };
    CalendarComponent.decorators = [
        { type: Component, args: [{
                    // tslint:disable-next-line
                    selector: 'ng-fullcalendar',
                    template: '',
                },] },
    ];
    /** @nocollapse */
    CalendarComponent.ctorParameters = function () { return [
        { type: ElementRef, },
        { type: NgZone, },
    ]; };
    CalendarComponent.propDecorators = {
        "eventsModel": [{ type: Input, args: ['eventsModel',] },],
        "eventsModelChange": [{ type: Output },],
        "options": [{ type: Input },],
        "eventDrop": [{ type: Output },],
        "eventResize": [{ type: Output },],
        "eventClick": [{ type: Output },],
        "clickButton": [{ type: Output },],
        "windowResize": [{ type: Output },],
        "viewRender": [{ type: Output },],
        "viewDestroy": [{ type: Output },],
        "eventRender": [{ type: Output },],
        "initialized": [{ type: Output },],
        "select": [{ type: Output },],
        "unselect": [{ type: Output },],
        "dayClick": [{ type: Output },],
        "navLinkDayClick": [{ type: Output },],
        "navLinkWeekClick": [{ type: Output },],
    };
    return CalendarComponent;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var FullCalendarModule = /** @class */ (function () {
    function FullCalendarModule() {
    }
    FullCalendarModule.decorators = [
        { type: NgModule, args: [{
                    declarations: [CalendarComponent],
                    exports: [CalendarComponent],
                },] },
    ];
    return FullCalendarModule;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var ButtonClickModel = /** @class */ (function () {
    function ButtonClickModel() {
    }
    return ButtonClickModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
var UpdateEventModel = /** @class */ (function () {
    function UpdateEventModel() {
    }
    return UpdateEventModel;
}());

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
/**
 * Generated bundle index. Do not edit.
 */

export { FullCalendarModule, CalendarComponent, ButtonClickModel, UpdateEventModel };
//# sourceMappingURL=ng-retro-fullcalendar.es5.js.map
