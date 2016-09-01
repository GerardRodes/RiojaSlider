/**
 * RiojaSlider 0.1v
 *
 * Copyright 2016, Gerard Rodes https://github.com/GerardRodes
 *
 * Released under the MIT license - http://opensource.org/licenses/MIT
 */
/*
	Inserts svg icons to structures following this pattern

	[data-social-links]			Wrapper attribute
		|->	[data-name]			Link element attribute, it can be anywhere inside the wrapper

	
	Attributes placed at wrapper will be applied to all children link elements,
	this attributes can be overwritted defining them at link element.
	All attributes must be prefixed by "data-", example: data-color="black".
	To disable an attributes just defined it with an invalid value, example: data-hover="none" (this would disable hover effects, however data-hover="" would be enough to disabled it)

	-ATTRIBUTES-				
	color: 			CSS color string
	shape: 			( normal | circle )
	size:        	Size in px
	hover: 			Hover css effectos to apply on hover => data-hover="attr1:value1;attr2:value2;attr3:value3..."
	msg: 			Message before social network name at title attribue on link tag
	transition: 	CSS transition to apply
	target: 		target attribute value on link tag
	folder: 		Url of the folder where the "svg" folder with the images is placed
	css: 			Boolean, specifies if apply default css

	-LINKS UNIQUE ATTRIBUTES-
	url: 			Url to define href of the link tag
	name: 			String to specify the social network, accepted values are store at `socialIcons` variable on line 47

	
	Some CSS styles are applied to the wrapper and links by default, this styles are defined
	on `css` variable on line 657. This can be disabled adding a value not "true" to the data-css tag.
	This way you can disble css globally adding data-css="false" to the wrapper, and then
	active css styles adding data-css="true" on some required elements
*/
(function($) {

    var defaultOptions = {
            color: '#000000',
            shape: 'normal',
            size: '24',
            msg: 'Contacta en ',
            transition: '.35s',
            target: '_blank',
            folder: '',
            css: true
        },
        socialIcons = [{
            name: 'forrst',
            hover: 'fill:#333333',
            icon: {
                circle: '01-forrst.svg',
                normal: '01-forrst.svg'
            }
        }, {
            name: 'dribbble',
            hover: 'fill:#333333',
            icon: {
                circle: '02-dribbble.svg',
                normal: '02-dribbble.svg'
            }
        }, {
            name: 'twitter',
            hover: 'fill:#55acee',
            icon: {
                circle: '03-twitter.svg',
                normal: '03-twitter.svg'
            }
        }, {
            name: 'flickr',
            hover: 'fill:#ff0084',
            icon: {
                circle: '04-flickr.svg',
                normal: '04-flickr.svg'
            }
        }, {
            name: 'twitter-letter',
            hover: 'fill:#55acee',
            icon: {
                circle: '05-twitter.svg',
                normal: '05-twitter.svg'
            }
        }, {
            name: 'facebook',
            hover: 'fill:#3b5998',
            icon: {
                circle: '06-facebook.svg',
                normal: '06-facebook.svg'
            }
        }, {
            name: 'skype',
            hover: 'fill:#333333',
            icon: {
                circle: '07-skype.svg',
                normal: '07-skype.svg'
            }
        }, {
            name: 'digg',
            hover: 'fill:#333333',
            icon: {
                circle: '08-digg.svg',
                normal: '08-digg.svg'
            }
        }, {
            name: 'google',
            hover: 'fill:#dd4b39',
            icon: {
                circle: '09-google.svg',
                normal: '09-google.svg'
            }
        }, {
            name: 'html5',
            hover: 'fill:#333333',
            icon: {
                circle: '10-html5.svg',
                normal: '10-html5.svg'
            }
        }, {
            name: 'linkedin',
            hover: 'fill:#007bb5',
            icon: {
                circle: '11-linkedin.svg',
                normal: '11-linkedin.svg'
            }
        }, {
            name: 'lastfm',
            hover: 'fill:#333333',
            icon: {
                circle: '12-lastfm.svg',
                normal: '12-lastfm.svg'
            }
        }, {
            name: 'vimeo',
            hover: 'fill:#333333',
            icon: {
                circle: '13-vimeo.svg',
                normal: '13-vimeo.svg'
            }
        }, {
            name: 'yahoo',
            hover: 'fill:#333333',
            icon: {
                circle: '14-yahoo.svg',
                normal: '14-yahoo.svg'
            }
        }, {
            name: 'tumblr',
            hover: 'fill:#333333',
            icon: {
                circle: '15-tumblr.svg',
                normal: '15-tumblr.svg'
            }
        }, {
            name: 'apple',
            hover: 'fill:#333333',
            icon: {
                circle: '16-apple.svg',
                normal: '16-apple.svg'
            }
        }, {
            name: 'windows',
            hover: 'fill:#333333',
            icon: {
                circle: '17-windows.svg',
                normal: '17-windows.svg'
            }
        }, {
            name: 'youtube',
            hover: 'fill:#bb0000',
            icon: {
                circle: '18-youtube.svg',
                normal: '18-youtube.svg'
            }
        }, {
            name: 'delicious',
            hover: 'fill:#333333',
            icon: {
                circle: '19-delicious.svg',
                normal: '19-delicious.svg'
            }
        }, {
            name: 'rss',
            hover: 'fill:#333333',
            icon: {
                circle: '20-rss.svg',
                normal: '20-rss.svg'
            }
        }, {
            name: 'picasa',
            hover: 'fill:#333333',
            icon: {
                circle: '21-picasa.svg',
                normal: '21-picasa.svg'
            }
        }, {
            name: 'deviantart',
            hover: 'fill:#333333',
            icon: {
                circle: '22-deviantart.svg',
                normal: '22-deviantart.svg'
            }
        }, {
            name: 'whatsapp',
            hover: 'fill:#4dc247',
            icon: {
                circle: '23-whatsapp.svg',
                normal: '23-whatsapp.svg'
            }
        }, {
            name: 'snapchat',
            hover: 'fill:#333333',
            icon: {
                circle: '24-snapchat.svg',
                normal: '24-snapchat.svg'
            }
        }, {
            name: 'blogger',
            hover: 'fill:#333333',
            icon: {
                circle: '25-blogger.svg',
                normal: '25-blogger.svg'
            }
        }, {
            name: 'wordpress',
            hover: 'fill:#333333',
            icon: {
                circle: '26-wordpress.svg',
                normal: '26-wordpress.svg'
            }
        }, {
            name: 'amazon',
            hover: 'fill:#333333',
            icon: {
                circle: '27-amazon.svg',
                normal: '27-amazon.svg'
            }
        }, {
            name: 'appstore',
            hover: 'fill:#333333',
            icon: {
                circle: '28-appstore.svg',
                normal: '28-appstore.svg'
            }
        }, {
            name: 'paypal',
            hover: 'fill:#333333',
            icon: {
                circle: '29-paypal.svg',
                normal: '29-paypal.svg'
            }
        }, {
            name: 'myspace',
            hover: 'fill:#333333',
            icon: {
                circle: '30-myspace.svg',
                normal: '30-myspace.svg'
            }
        }, {
            name: 'dropbox',
            hover: 'fill:#333333',
            icon: {
                circle: '31-dropbox.svg',
                normal: '31-dropbox.svg'
            }
        }, {
            name: 'windows8',
            hover: 'fill:#333333',
            icon: {
                circle: '32-windows8.svg',
                normal: '32-windows8.svg'
            }
        }, {
            name: 'pinterest',
            hover: 'fill:#cb2027',
            icon: {
                circle: '33-pinterest.svg',
                normal: '33-pinterest.svg'
            }
        }, {
            name: 'soundcloud',
            hover: 'fill:#333333',
            icon: {
                circle: '34-soundcloud.svg',
                normal: '34-soundcloud.svg'
            }
        }, {
            name: 'google-drive',
            hover: 'fill:#333333',
            icon: {
                circle: '35-google-drive.svg',
                normal: '35-google-drive.svg'
            }
        }, {
            name: 'android',
            hover: 'fill:#333333',
            icon: {
                circle: '36-android.svg',
                normal: '36-android.svg'
            }
        }, {
            name: 'behance',
            hover: 'fill:#333333',
            icon: {
                circle: '37-behance.svg',
                normal: '37-behance.svg'
            }
        }, {
            name: 'instagram',
            hover: 'fill:#e95950',
            icon: {
                circle: '38-instagram.svg',
                normal: '38-instagram.svg'
            }
        }, {
            name: 'ebay',
            hover: 'fill:#333333',
            icon: {
                circle: '39-ebay.svg',
                normal: '39-ebay.svg'
            }
        }, {
            name: 'google-plus',
            hover: 'fill:#333333',
            icon: {
                circle: '40-google-plus.svg',
                normal: '40-google-plus.svg'
            }
        }, {
            name: 'github',
            hover: 'fill:#333333',
            icon: {
                circle: '41-github.svg',
                normal: '41-github.svg'
            }
        }, {
            name: 'stackoverflow',
            hover: 'fill:#333333',
            icon: {
                circle: '42-stackoverflow.svg',
                normal: '42-stackoverflow.svg'
            }
        }, {
            name: 'spotify',
            hover: 'fill:#333333',
            icon: {
                circle: '43-spotify.svg',
                normal: '43-spotify.svg'
            }
        }, {
            name: 'stumbleupon',
            hover: 'fill:#333333',
            icon: {
                circle: '44-stumbleupon.svg',
                normal: '44-stumbleupon.svg'
            }
        }, {
            name: 'visa',
            hover: 'fill:#333333',
            icon: {
                circle: '45-visa.svg',
                normal: '45-visa.svg'
            }
        }, {
            name: 'mastercard',
            hover: 'fill:#333333',
            icon: {
                circle: '46-mastercard.svg',
                normal: '46-mastercard.svg'
            }
        }, {
            name: 'amex',
            hover: 'fill:#333333',
            icon: {
                circle: '47-amex.svg',
                normal: '47-amex.svg'
            }
        }, {
            name: 'ios',
            hover: 'fill:#333333',
            icon: {
                circle: '48-ios.svg',
                normal: '48-ios.svg'
            }
        }, {
            name: 'osx',
            hover: 'fill:#333333',
            icon: {
                circle: '49-osx.svg',
                normal: '49-osx.svg'
            }
        }, {
            name: 'evernote',
            hover: 'fill:#333333',
            icon: {
                circle: '50-evernote.svg',
                normal: '50-evernote.svg'
            }
        }, {
            name: 'yelp',
            hover: 'fill:#333333',
            icon: {
                circle: '51-yelp.svg',
                normal: '51-yelp.svg'
            }
        }, {
            name: 'yelp',
            hover: 'fill:#333333',
            icon: {
                circle: '52-yelp.svg',
                normal: '52-yelp.svg'
            }
        }, {
            name: 'medium',
            hover: 'fill:#333333',
            icon: {
                circle: '53-medium.svg',
                normal: '53-medium.svg'
            }
        }, {
            name: 'slack',
            hover: 'fill:#333333',
            icon: {
                circle: '54-slack.svg',
                normal: '54-slack.svg'
            }
        }, {
            name: 'vine',
            hover: 'fill:#333333',
            icon: {
                circle: '55-vine.svg',
                normal: '55-vine.svg'
            }
        }, {
            name: 'edge',
            hover: 'fill:#333333',
            icon: {
                circle: '56-edge.svg',
                normal: '56-edge.svg'
            }
        }, {
            name: 'outlook',
            hover: 'fill:#333333',
            icon: {
                circle: '57-outlook.svg',
                normal: '57-outlook.svg'
            }
        }, {
            name: 'pencilcase',
            hover: 'fill:#333333',
            icon: {
                circle: '58-pencilcase.svg',
                normal: '58-pencilcase.svg'
            }
        }, {
            name: 'play',
            hover: 'fill:#333333',
            icon: {
                circle: '59-play.svg',
                normal: '59-play.svg'
            }
        }, {
            name: 'icloud',
            hover: 'fill:#333333',
            icon: {
                circle: '60-icloud.svg',
                normal: '60-icloud.svg'
            }
        }, {
            name: 'google-inbox',
            hover: 'fill:#333333',
            icon: {
                circle: '61-google-inbox.svg',
                normal: '61-google-inbox.svg'
            }
        }, {
            name: 'periscope',
            hover: 'fill:#333333',
            icon: {
                circle: '62-periscope.svg',
                normal: '62-periscope.svg'
            }
        }, {
            name: 'blackberry',
            hover: 'fill:#333333',
            icon: {
                circle: '63-blackberry.svg',
                normal: '63-blackberry.svg'
            }
        }, {
            name: 'viber',
            hover: 'fill:#333333',
            icon: {
                circle: '64-viber.svg',
                normal: '64-viber.svg'
            }
        }, {
            name: 'fb_messenger',
            hover: 'fill:#333333',
            icon: {
                circle: '65-fb_messenger.svg',
                normal: '65-fb_messenger.svg'
            }
        }, {
            name: 'wechat',
            hover: 'fill:#333333',
            icon: {
                circle: '66-wechat.svg',
                normal: '66-wechat.svg'
            }
        }, {
            name: 'gmail',
            hover: 'fill:#333333',
            icon: {
                circle: '67-gmail.svg',
                normal: '67-gmail.svg'
            }
        }, {
            name: 'airbnb',
            hover: 'fill:#333333',
            icon: {
                circle: '68-airbnb.svg',
                normal: '68-airbnb.svg'
            }
        }, {
            name: 'angellist',
            hover: 'fill:#333333',
            icon: {
                circle: '69-angellist.svg',
                normal: '69-angellist.svg'
            }
        }, {
            name: 'uber',
            hover: 'fill:#333333',
            icon: {
                circle: '70-uber.svg',
                normal: '70-uber.svg'
            }
        }, {
            name: 'safari',
            hover: 'fill:#333333',
            icon: {
                circle: '71-safari.svg',
                normal: '71-safari.svg'
            }
        }, {
            name: 'firefox',
            hover: 'fill:#333333',
            icon: {
                circle: '72-firefox.svg',
                normal: '72-firefox.svg'
            }
        }, {
            name: 'opera',
            hover: 'fill:#333333',
            icon: {
                circle: '73-opera.svg',
                normal: '73-opera.svg'
            }
        }, {
            name: 'bing',
            hover: 'fill:#333333',
            icon: {
                circle: '74-bing.svg',
                normal: '74-bing.svg'
            }
        }, {
            name: 'reddit',
            hover: 'fill:#333333',
            icon: {
                circle: '75-reddit.svg',
                normal: '75-reddit.svg'
            }
        }, {
            name: 'producthunt',
            hover: 'fill:#333333',
            icon: {
                circle: '76-producthunt.svg',
                normal: '76-producthunt.svg'
            }
        }],
        css = {
            list: {
                listStyle: 'none',
                margin: '0',
                transition: '.35s'
            },
            link: {
                display: 'inline-block',
                margin: '0',
                padding: '0',
                transition: '.35s'
            }
        },
        cache = [],
        loadQueue = [];

    var socialLists = $('[data-social-links]');

    $.each(socialLists, function(i, el) {
        var customlistOptions = {
                color: $(el).attr('data-color'),
                shape: $(el).attr('data-shape'),
                size: $(el).attr('data-size'),
                target: $(el).attr('data-target'),
                css: $(el).attr('data-css'),
                hover: $(el).attr('data-hover'),
                msg: $(el).attr('data-msg'),
                transition: $(el).attr('data-transition'),
                folder: $(el).attr('data-folder')
            },
            listOptions = $.extend({}, defaultOptions, customlistOptions),
            socialLinksGroup = $(el).find('[data-social]');

        if (listOptions.css == true || listOptions.css == "true") {
            $(el).css(css.list)
        }

        $.each(socialLinksGroup, function(i, el) {
            var customLinkOptions = {
                    color: $(el).attr('data-color'),
                    shape: $(el).attr('data-shape'),
                    size: $(el).attr('data-size'),
                    css: $(el).attr('data-css'),
                    hover: $(el).attr('data-hover'),
                    target: $(el).attr('data-target'),
                    msg: $(el).attr('data-msg'),
                    url: $(el).attr('data-url'),
                    transition: $(el).attr('data-transition'),
                    name: $(el).attr('data-name')
                },
                linkOptions = $.extend({}, listOptions, customLinkOptions),
                imageUrl = getImageUrl(linkOptions),
                html;

            if (linkOptions.hover == undefined) {
                linkOptions.hover = getHover(linkOptions);
            }
            if (linkOptions.css == true || linkOptions.css == "true") {
                $(el).css(css.link)
            }
            var cachedIcon = getCached(linkOptions.name);
            switch (cachedIcon) {
                case 'notCached':
                    cache.push({
                        name: linkOptions.name,
                        svg: 'loading'
                    })
                    $.get(imageUrl,
                        function(data) {
                            svg = $(data).find('svg')
                                .removeAttr('xmlns:a');
                            cachedItem = getCached(linkOptions.name);
                            cachedItem.svg = svg;

                            loadQueue.push({
                                options: linkOptions,
                                element: $(el)
                            })

                            $.each(getLoadQueue(linkOptions.name), function(i, waitingIcon) {
                                $(waitingIcon.element).html(buildIcon(waitingIcon.options, svg, i));
                                loadQueue = removeElement(loadQueue, waitingIcon);
                            })
                        })
                    break;
                case 'loading':
                    loadQueue.push({
                        options: linkOptions,
                        element: $(el)
                    })
                    break;
                default:
                    $(el).html(buildIcon(linkOptions, cachedIcon.svg, i));
                    break;
            }

        })
    })

    function getImageUrl(linkOptions) {
        var imgName = socialIcons.filter(function(el) {
            return el.name == linkOptions.name
        })[0].icon[linkOptions.shape];
        return linkOptions.folder + 'svg/' + linkOptions.shape + '/' + imgName;
    }

    function getHover(linkOptions) {
        var hover = socialIcons.filter(function(el) {
            return el.name == linkOptions.name
        })[0].hover;
        return hover;
    }

    function capitalizeFirstLetter(string) {
        return string.charAt(0).toUpperCase() + string.slice(1);
    }

    function buildIcon(linkOptions, svg, i) {
        var svg = svg.css('transition', linkOptions.transition)
            .attr({
                'height': linkOptions.size,
                'width': linkOptions.size,
                'id': 'social-link-' + linkOptions.name + '-' + i,
                'fill': linkOptions.color
            }),
            linkTag = $(document.createElement('a')),
            hoverAttr = linkOptions.hover.split(';')
            .reduce(function(total, currentValue, currentIndex, arr) {
                var temp = currentValue.split(':')
                total[temp[0]] = temp[1];
                return total;
            }, {})
        linkTag.attr({
            'href': linkOptions.url,
            'title': linkOptions.msg + capitalizeFirstLetter(linkOptions.name),
            'target': linkOptions.target
        })
        linkTag.html($(document.createElement('div')).append(svg).html())

        $(linkTag).hover(function() {
            $(linkTag).find('svg').css(hoverAttr)
        }, function() {
            $.each(hoverAttr, function(i, el) {
                $(linkTag).find('svg').css(i, '')
            })
        })
        return linkTag
    }

    function getCached(name) {
        cachedIcon = $.grep(cache, function(el) {
            return el.name == name
        })[0];

        if (cachedIcon == undefined) {
            return 'notCached';
        } else if (cachedIcon.svg == 'loading') {
            return 'loading';
        } else {
            return cachedIcon;
        }
    }

    function getLoadQueue(queueName) {
        return $.grep(loadQueue, function(el) {
            return el.options.name == queueName
        });
    }

    function removeElement(array, element) {
        return $.grep(array, function(el) {
            return el != element
        });
    }
})(jQuery);
