function submitForm(e){$(e).removeAttr("onclick");var t=$(e).parents("form:first");$("input:submit",t).attr("disabled","disabled");setTimeout(function(){t.submit()},500)}function submitAjax(e){var t=$(e).parents("form:first");t.submit()}function flashMessage(e,t){var n="<ul>";n+=t;n+="</ul>";e.html(n).fadeIn("fast").fadeOut(4e3).html()}function showSysMessage(e,t,n,r){var i=$("#system-message-template").clone().appendTo($("body"));i.addClass(e);$("p strong",i).prepend(t);$("p",i).append(n);r?i.slideDown("fast").delay(2e3).slideUp("fast"):i.slideDown("fast",function(){$("a.system-message-close",i).on("click",function(e){i.slideUp("fast");return!1})})}function showConfirmationMessage(e){var t=$("#confirmation-container"),n='<div class="modal-window"><article class="modal base"><p>'+e+"</p>"+"</article></div>";$("div.modal-window",t).replaceWith(n);t.fadeIn("fast").addClass("visible");t.delay(1250).fadeOut("fast").removeClass("visible")}function showDefaultAvatar(e){e.onerror="";e.src=window.default_avatar_url;return!0}function scrollToBuoy(){$.getScript("/themes/default/media/js/jquery.scrollto.js",function(){$.scrollTo($("#buoy"),{duration:300,axis:"y",easing:"linear",offset:-100});$("#buoy").prepend("<div class='buoy-message base'><p>Here's where you left off.</p></div>");$("#buoy .buoy-message").fadeIn("fast");$("#buoy .buoy-message").delay(2e3).fadeOut("slow")})}function nearBottom(e){var t=40;return $(document).height()-$(window).scrollTop()-$(window).height()-t<$(document).height()-e.offset().top}$(document).ready(function(){function e(){$(".popover-window").bind("clickoutside",function(e){$(this).fadeOut("fast").unbind()})}function t(e,t){this.modal=t==undefined?!1:t;this.container=this.modal?$("#modal-container"):$("#zoom-container");this.contents=e;this.dialogBox=$("div.modal-window",this.container)}function n(e,t,n,r){r||(r=this);$.get(e,function(e){var i=$(e);i.hasClass(t)||(i=$(e).find("."+t));n.call(r,i)})}$(".button-blue a, .button-white a").has("span.nodisplay").parents("p").addClass("only-icon");$(".button-blue a, .button-white a").has("span.icon").parents("p, li").addClass("has-icon");$("a.popover-trigger").live("click",function(t){$(this).closest(".popover").toggleClass("active");$(this).closest(".popover").find(".popover-window").fadeToggle("fast");e();return!1});$(".filters-type .toggle-filters-display").live("click touchstart",function(){$(this).parent().toggleClass("visible");$(this).siblings(".filters-type-details").slideToggle("fast")});t.prototype.hide=function(){if(!this.modal&&$("body").hasClass("has_modal"))return;this.container.fadeOut("slow");this.modal?$("body").removeClass("has_modal"):$("body").removeClass("zoomed");this.container.removeClass("visible");!$("body").hasClass("zoomed")&&!$("body").hasClass("has_modal")&&$("body").removeClass("noscroll");this.dialogBox.unbind();return this};t.prototype._registerHide=function(){var e=this;this.dialogBox.bind("clickoutside",function(t){e.hide();return!1});var t=function(n){if(n.keyCode==27){e.hide()&&$(window).unbind("keypress",t);return!1}};$(window).bind("keypress",t);return this};t.prototype.show=function(){this.dialogBox.html(this.contents);this.container.addClass("visible");this.container.fadeIn(350);$("body").addClass("noscroll");if(!this.modal){$("body").addClass("zoomed");this._registerHide()}else $("body").addClass("has_modal");return this};t.prototype.transition=function(){var e=$(this.container);$("#modal-viewport",e).addClass("view-secondary");$("#modal-primary > div",e).fadeOut("fast");$("#modal-secondary .modal-segment",e).fadeIn("fast");e.scrollTop(0,0);this._registerBackHandler();return this};t.prototype._registerBackHandler=function(){var e=$(this.container);$("a.modal-back",e).bind("click",function(){$("#modal-viewport",e).removeClass("view-secondary");$("#modal-primary > div",e).fadeIn("fast");$("#modal-secondary .modal-segment",e).fadeOut("fast");return!1});return this};var r=null;window.modalHide=function(){r&&r.hide()};window.modalShow=function(e){r=(new t(e,!0)).show()};window.modalTransition=function(e){r&&r.transition(e)};$("a.modal-trigger").live("click",function(){n($(this).attr("href"),"modal",modalShow);return!1});$("article.modal a.modal-close").live("click",function(e){r.hide();return!1});$("a.modal-transition").live("click",function(e){r.transition();return!1});var i=null;window.zoomHide=function(){i&&i.hide()};window.zoomShow=function(e){i=(new t(e)).show()};$("a.zoom-trigger").live("click",function(){n($(this).attr("href"),"modal",zoomShow);return!1});$("#zoom-container a.zoom-close").live("click",function(){zoomHide();return!1});var s=function(e,t){var n=$(e).data("title");if(n!=undefined){var r=$(e).closest("div.parameter").find("h2").html();r==null&&(r="");container=$("#confirmation-container");var i='<div class="modal-window"><article class="modal base"><p>You are '+n+" "+r+"</p>"+"</article>"+"</div>";$("div.modal-window",container).replaceWith(i);container.fadeIn("fast").addClass("visible");container.delay(1e3).fadeOut("fast").removeClass("visible");t.stopPropagation()}};$(".follow a").live("click",function(e){s(this,e)});$(".remove a").live("click",function(e){var t=$(this).attr("href");$(t).fadeOut("fast").remove();$(this).parent().fadeOut("fast").remove();e.preventDefault()});$("input, textarea").live("keypress",function(){$(this).closest("form").find(".save-toolbar").addClass("visible")});$("select").live("change",function(){$(this).closest("form").find(".save-toolbar").addClass("visible")});$(":radio, :checkbox").click(function(){$(this).closest("form").find(".save-toolbar").addClass("visible")});$("section.meta-data h3").live("click",function(e){$(this).toggleClass("open").siblings("div.meta-data-content").slideToggle("fast")});$("#buoy").length>0&&scrollToBuoy();$("input[type=password]").keypress(function(e){if(e.which==13){$(this).parents("form:first").submit();e.preventDefault()}});if(typeof logged_in_account!="undefined"){$("header .user-menu .bucket a").live("click",function(){modalShow((new Assets.HeaderBucketsModal({collection:Assets.bucketList})).render().el);return!1});$("header .user-menu .rivers a").live("click",function(){modalShow((new Assets.HeaderRiversModal({collection:Assets.riverList})).render().el);return!1})}$("#confirm-window-template").length&&(window.ConfirmationWindow=Backbone.View.extend({tagName:"article",className:"modal",template:_.template($("#confirm-window-template").html()),events:{"click a.button-submit":"confirm"},constructor:function(e,t,n){Backbone.View.prototype.constructor.apply(this);this.message=e;this.callback=t;this.context=n},show:function(){modalShow(this.render().el)},render:function(){this.$el.html(this.template({message:this.message}));return this},confirm:function(){modalHide();this.callback.call(this.context);return!1}}));window.system_messages&&_.each(window.system_messages,function(e){showSysMessage(e.type,e.title,e.message,e.flash)});$(".body-tabs-menu a").live("click",function(e){var t=$(this).prop("hash");$(".body-tabs-window div.active").removeClass("active").fadeOut(100,function(){$(".body-tabs-window "+t).fadeIn("fast").addClass("active")});$(".body-tabs-menu li").removeClass("active");$(this).parent().addClass("active");e.preventDefault()});$("a.system-message-close").live("click",function(e){$(this).closest("article.system-message").slideUp("fast");e.preventDefault()})});window.addEventListener("load",function(){setTimeout(function(){window.scrollTo(0,1)},0)});