/**
 * Freeow!
 * Stylish, Growl-like message boxes
 *
 * Copyright (c) 2011 PJ Dietz
 * Version: 1.0.0
 * Licensed under the MIT license:
 * http://www.opensource.org/licenses/mit-license.php
 *
 * http://pjdietz.com/jquery-plugins/freeow/
 */
 
/*global setTimeout, jQuery */

(function ($) {

    "use strict";
     
    var Freeow;
    
    Freeow = function (title, message, options) {
        
        var startStyle, i, u;
        
        // Merge the options.
        this.options = $.extend({}, $.fn.freeow.defaults, options);
                    
        // Build the element with the template function.
        this.element = $(this.options.template(title, message));
        
        // Set its initial style to the startStyle or hideStyle.
        if (this.options.startStyle) {
            startStyle = this.options.startStyle;
        }
        else {
            startStyle = this.options.hideStyle;
        }
        this.element.css(startStyle);

        // Store a reference to it in the data.
        this.element.data("freeow", this);
        
        // Add to the element.
        for (i = 0, u = this.options.classes.length; i < u; i += 1) {
            this.element.addClass(this.options.classes[i]);
        }
            
        // Bind the event handler.
        this.element.click(this.options.onClick);
        this.element.hover(this.options.onHover);
        
        // Default. Set to true in show() if there's an autoHideDelay.
        this.autoHide = false;
        
    };
    
    Freeow.prototype = {
        
        attach: function (container) {
            $(container).prepend(this.element);
            this.show();
        }, 
        
        show: function () {
            
            var opts, self, fn, delay;
            
            opts = { 
                duration: this.showDuration
            };
            
            // If an auto hide delay is set, create a callback function and
            // set it to fire after the auto hide time expires.
            if (this.options.autoHide && this.options.autoHideDelay > 0) {
      
                this.autoHide = true;
                
                self = this;
                delay = this.options.autoHideDelay;
                fn = function () { 
                    if (self.autoHide) {
                        self.hide(); 
                    }
                };
                
                opts.complete = function () {
                    setTimeout(fn, delay);
                };
                    
            }    
            
            // Animate to the "show" style.
            // Optionally, set the auto hide function to fire on a delay.
            this.element.animate(this.options.showStyle, opts);

        },
        
        hide: function () {
            
            var self = this; // Keep "this" from current scope;
                     
            this.element.animate(this.options.hideStyle, {
                duration: this.options.hideDuration,
                complete: function () {
                    self.destroy();
                }    
            });

        },
        
        destroy: function () {
            
            // Remove the Freeow instance from the element's data.
            this.element.data("freeow", undefined);
            
            // Remove the element from the DOM.
            this.element.remove();
            
        }
        
    };
    
    // Extend jQuery ----------------------------------------------------------- 

    if (typeof $.fn.freeow === "undefined") {
     
        $.fn.extend({  
            
            freeow: function (title, message, options) {
            
                return this.each(function () {
                    
                    var f;
                    
                    f = new Freeow(title, message, options);
                    f.attach(this);
                            
                }); // return this.each()
            
            } // freeow()
        
        }); // $.fn.extend()
     
        // Configuration Defaults. 
        $.fn.freeow.defaults = {
            
            autoHide: true,
            autoHideDelay: 3000,
            classes: [],
            startStyle: null,
            showStyle: {opacity: 1.0},
            showDuration: 250,
            hideStyle: {opacity: 0.0},
            hideDuration: 500,
            
            onClick: function (event) {
                $(this).data("freeow").hide();
            },
            
            onHover: function (event) {
                $(this).data("freeow").autoHide = false;
            },
               
            template: function (title, message) {
                
                var e;
                
                e = [
                    '<div>',
                    '<div class="background">',
                    '<div class="content">',
                    '<h2>' + title + '</h2>',
                    '<p>' + message + '</p>',
                    '</div>',
                    '</div>',
                    '<span class="icon"></span>',
                    '<span class="close"></span>',
                    '</div>'
                ].join("");
                
                return e;
            }
             
        }; // $.fn.freeow.defaults
        
    } // if undefined        
            
}(jQuery));

/*jslint white: true, browser: true, onevar: true, undef: true, nomen: true, eqeqeq: true, plusplus: true, bitwise: true, regexp: true, newcap: true, immed: true, strict: true */