jQuery(function($)
{
	"use strict";



	/* mobile hamburger menu toggle */
	$(".layout_mobile_menu").each(function()
	{
		$( this ).click(function( event )
		{
			event.preventDefault();
			layout_toggleMenuOpener( $( this ).get(0) );
		});
	});

	/* detect scrolling up or down to hide or show the hamburger menu */
	var previousScroll = 0;
	var simpleScrolled = false;
	var scrollThreshold = 5;

	/* detect window scrolling */
	$( window ).scroll(function()
	{
		simpleScrolled = true;
	});

	/* refresh window scrolling per 250 ms, and show/hide the menu */
	setInterval(function()
	{
		if (simpleScrolled) {
			display_menu();
			simpleScrolled = false;
		}
	}, 250);

	/* function to show/hide the menu */
	var display_menu = function()
	{
		var currentScroll = $(window).scrollTop();
		if (currentScroll < 0) {
			currentScroll = 0;
		}

		if (currentScroll > previousScroll)
		{
			if($("#layout_menu_toggle").css( 'position' ) === 'fixed')
			{
				$("#layout_menu_toggle").fadeOut();
			}
		}
		else
		{
			if($("#layout_menu_toggle").css( 'position' ) === 'fixed')
			{
				$("#layout_menu_toggle").fadeIn(400, function() {
					$("#layout_menu_toggle").css('display', '')
				});
				;
			}
		}
		previousScroll = currentScroll;
	}

	/* keyboard accessibility for dropdown menu */
	$(".layout_dropdown").each(function()
	{
		$( this ).focusin( function( event )
		{
			$('*[data-dropdown="active"]').css('display', '').attr('data-dropdown', '').parents('li.layout_dropdown').removeClass('layout_focus');
			$( this ).addClass('layout_focus');
			$( this ).find("ul.layout_dropdown-content").css('display', 'block').attr('data-dropdown', 'active');
		});
	});

	$('body').focusin(function( event )
	{
		if (!$(event.target).parents('.layout_dropdown').is('.layout_dropdown'))
		{
			$('*[data-dropdown="active"]').css('display', '').attr('data-dropdown', '').parents('li.layout_dropdown').removeClass('layout_focus');
		}
	});
	/* keyboard accessibility for dropdown menu END */

	function layout_toggleMenuOpener(obj)
	{
		if(obj.classList.contains("is-active") === true)
		{
			var targetMenu = $(obj).attr('data-target');
			$('#' + targetMenu).slideUp('300', function()
			{
				$(this).css('display', '');
			});

			obj.classList.remove("is-active");
		}
		else {
			var targetMenu = $(obj).attr('data-target');
			if(targetMenu == 'layout_gnb')
			{
				$('#layout_gnb>ul>li:first-child .layout_dropdown-content, #layout_gnb>ul>li:first-child .layout_dropdown-content a').css('width', '').css('min-width', '');
				$('html,body').animate({scrollTop:0}, 200);
			}
			$('#' + targetMenu).slideDown('300');

			obj.classList.add("is-active");
		}
	}

	function layout_toggleDarkmode() {
		if(layout_darkmode_enabled != 'Y') return;
		
		if(getColorScheme() === 'light') {
			setColorScheme('dark');
			$('.layout_frame').addClass('layout_darkmode');
			setCookie('is_dark_theme', true);
		}
		else if(getColorScheme() === 'dark') {
			setColorScheme('light');
			$('.layout_frame').removeClass('layout_darkmode');
			setCookie('is_dark_theme', null, new Date('Thu, 01 Jan 1970 00:00:01 GMT'));
		}
	}
	// Language Select
	$('.layout_language>.toggle').click(function()
	{
		$('.selectLang').toggle();
	});
	
	/* darkmode toggle */
	$(".layout_darkmode_toggle").each(function()
	{
		$( this ).click(function( event )
		{
			event.preventDefault();
			layout_toggleDarkmode( );
			return false;
		});
	});
	
	// Auto dark mode
	if (layout_darkmode_enabled != 'N' && getColorScheme() == 'dark' && !getCookie('rx_color_scheme')) {
		$('.layout_frame').addClass('layout_darkmode');
		if (getColorScheme() == 'dark' && !getCookie('is_dark_theme')) {
			setCookie('is_dark_theme', true);
			location.reload();
		}
	}
	if (getColorScheme() == 'light' && getCookie('is_dark_theme')) {
		setCookie('is_dark_theme', null, new Date('Thu, 01 Jan 1970 00:00:01 GMT'));
		location.reload();
	}
});