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
class CalendarComponent {
    /**
     * @param {?} element
     * @param {?} zone
     */
    constructor(element, zone) {
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
    /**
     * @return {?}
     */
    get eventsModel() {
        return this._eventsModel;
    }
    /**
     * @param {?} value
     * @return {?}
     */
    set eventsModel(value) {
        this._eventsModel = value;
        if (this._reRender) {
            setTimeout(() => {
                this.renderEvents(value);
            }, 50);
        }
        else {
            this._reRender = true;
        }
    }
    /**
     * @return {?}
     */
    ngOnInit() {
    }
    /**
     * @return {?}
     */
    ngAfterViewInit() {
        setTimeout(() => {
            this.updaterOptions();
            this.zone.runOutsideAngular(() => {
                $(this.element.nativeElement).fullCalendar(this.options);
                this._eventsModel = /** @type {?} */ (this.options.events);
                this.eventsModelChange.next(this.options.events);
                this.initialized.emit(true);
                // Click listeners
                let /** @type {?} */ elem = document.getElementsByTagName('ng-fullcalendar');
                $('[class ^="fc"][class *="button"]').click(el => {
                    let /** @type {?} */ classnames = el.currentTarget.className.split(' ');
                    classnames.forEach(name => {
                        if (name.indexOf('button') === name.length - 6) {
                            name = name.replace(/fc|button|-/g, '');
                            if (name !== '') {
                                this.renderEvents(this._eventsModel);
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
                    let /** @type {?} */ data = $('ng-fullcalendar').fullCalendar('getDate');
                    let /** @type {?} */ currentDetail = {
                        buttonType: buttonType,
                        data: data
                    };
                    let /** @type {?} */ widgetEvent = new CustomEvent('clickButton', {
                        bubbles: true,
                        detail: currentDetail
                    });
                    for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                        elem[i].dispatchEvent(widgetEvent);
                    }
                }
            });
        });
    }
    /**
     * @return {?}
     */
    ngAfterContentChecked() {
    }
    /**
     * @return {?}
     */
    ngAfterViewChecked() {
    }
    /**
     * @return {?}
     */
    updateEventsBeforeResize() {
        let /** @type {?} */ events = this.fullCalendar('clientEvents');
        this._reRender = false;
        this.eventsModel = events;
        this.eventsModelChange.next(events);
    }
    /**
     * @return {?}
     */
    updaterOptions() {
        let /** @type {?} */ elem = document.getElementsByTagName('ng-fullcalendar');
        this.options.eventDrop = (event, duration) => {
            let /** @type {?} */ detail = { event: event, duration: duration };
            let /** @type {?} */ widgetEvent = new CustomEvent('eventDrop', {
                bubbles: true,
                detail: detail
            });
            this.updateEventsBeforeResize();
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.eventResize = (event, duration) => {
            let /** @type {?} */ detail = { event: event, duration: duration };
            let /** @type {?} */ widgetEvent = new CustomEvent('eventResize', {
                bubbles: true,
                detail: detail
            });
            this.updateEventsBeforeResize();
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.eventRender = function (event, element, view) {
            let /** @type {?} */ detail = { event: event, element: element, view: view };
            let /** @type {?} */ widgetEvent = new CustomEvent('eventRender', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.eventClick = (event) => {
            let /** @type {?} */ detail = { event: event, duration: null };
            let /** @type {?} */ widgetEvent = new CustomEvent('eventClick', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.windowResize = function (view) {
            let /** @type {?} */ detail = { view: view };
            let /** @type {?} */ widgetEvent = new CustomEvent('windowResize', {
                bubbles: true,
                detail: detail
            });
            if (elem && elem[0]) {
                for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                    elem[i].dispatchEvent(widgetEvent);
                }
            }
        };
        this.options.viewRender = function (view, element) {
            let /** @type {?} */ detail = { view: view, element: element };
            let /** @type {?} */ widgetEvent = new CustomEvent('viewRender', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.viewDestroy = function (view, element) {
            let /** @type {?} */ detail = { view: view, element: element };
            let /** @type {?} */ widgetEvent = new CustomEvent('viewDestroy', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.select = function (start, end, jsEvent, view, resource) {
            let /** @type {?} */ detail = { start: start, end: end, jsEvent: jsEvent, view: view, resource: resource };
            let /** @type {?} */ widgetEvent = new CustomEvent('select', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.unselect = function (view, jsEvent) {
            let /** @type {?} */ detail = { view: view, jsEvent: jsEvent };
            let /** @type {?} */ widgetEvent = new CustomEvent('unselect', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.dayClick = function (date, jsEvent, view) {
            let /** @type {?} */ detail = { date: date, jsEvent: jsEvent, view: view };
            let /** @type {?} */ widgetEvent = new CustomEvent('dayClick', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.navLinkDayClick = function (date, jsEvent) {
            let /** @type {?} */ detail = { date: date, jsEvent: jsEvent };
            let /** @type {?} */ widgetEvent = new CustomEvent('navLinkDayClick', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
        this.options.navLinkWeekClick = function (weekStart, jsEvent) {
            let /** @type {?} */ detail = { weekStart: weekStart, jsEvent: jsEvent };
            let /** @type {?} */ widgetEvent = new CustomEvent('navLinkWeekClick', {
                bubbles: true,
                detail: detail
            });
            for (let /** @type {?} */ i = 0; i < elem.length; i++) {
                elem[i].dispatchEvent(widgetEvent);
            }
        };
    }
    /**
     * @param {...?} args
     * @return {?}
     */
    fullCalendar(...args) {
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
    }
    /**
     * @param {?} event
     * @return {?}
     */
    updateEvent(event) {
        return $(this.element.nativeElement).fullCalendar('updateEvent', event);
    }
    /**
     * @param {?} idOrFilter
     * @return {?}
     */
    clientEvents(idOrFilter) {
        return $(this.element.nativeElement).fullCalendar('clientEvents', idOrFilter);
    }
    /**
     * @param {?} events
     * @return {?}
     */
    renderEvents(events) {
        $(this.element.nativeElement).fullCalendar('removeEvents');
        if (events && events.length > 0) {
            $(this.element.nativeElement).fullCalendar('renderEvents', events, true);
            $(this.element.nativeElement).fullCalendar('rerenderEvents');
        }
    }
}
CalendarComponent.decorators = [
    { type: Component, args: [{
                // tslint:disable-next-line
                selector: 'ng-fullcalendar',
                template: '',
            },] },
];
/** @nocollapse */
CalendarComponent.ctorParameters = () => [
    { type: ElementRef, },
    { type: NgZone, },
];
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

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class FullCalendarModule {
}
FullCalendarModule.decorators = [
    { type: NgModule, args: [{
                declarations: [CalendarComponent],
                exports: [CalendarComponent],
            },] },
];

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class ButtonClickModel {
}

/**
 * @fileoverview added by tsickle
 * @suppress {checkTypes} checked by tsc
 */
class UpdateEventModel {
}

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
//# sourceMappingURL=ng-retro-fullcalendar.js.map
