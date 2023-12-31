/*
by Srikanta@moonraft  
open weather api to fetch weather-forcastv1.0.0

 */

$(document).ready(function() {
    setCurrentDateInBanner();
});
(function() {
    var apiKey = $('.banner-container').data('apikey');
    var lat = $('#hotel-banner-temperature').data('lat');
    var lon = $('#hotel-banner-temperature').data('lon');
    var hotellat = $('#hotel-banner-temperature').data('hotellat');
    var hotellon = $('#hotel-banner-temperature').data('hotellon');

    if (lat == undefined && hotellat != undefined) {
        lat = hotellat;
        lon = hotellon;
    }
    if (lat != undefined && lon != undefined) {
        var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + lat + "&lon=" + lon + "&appid="
                + apiKey + "&units=metric";

        $.getJSON(queryURL, function(data) {
            // var location = data.id.name; // not returned in response
            var temp = data.main.temp;

            var tempRound = parseFloat(temp).toFixed();
            if (tempRound != 'NaN') {
                $('#weather-update').append(tempRound);
            } else {
                $('.hotel-banner-temperature').hide();
                $('.hotel-banner-date').removeClass('inline-block');
            }
        });
    } else {
        console.log("Lat and long can't found")
        $('.banner-label-below-title-sm').hide();
        $('.banner-btn-con.inline-block').hide()
    }
}());

function setCurrentDateInBanner() {
    var currentDate = new Date();
    currentDate = moment(currentDate).format('Do MMM YYYY');
    console.log("Todays Date ", currentDate);
    var systemDateDom = $.find('.system-date')[0];
    if (systemDateDom) {
        $(systemDateDom).text(currentDate);
    }
}

function gobackfunction(){
  	  history.back();
  	}
var accountType = "";
$(document).ready(function() {
    changeApplyNow();
    basOpenForTataNeuCheck();

    if($( document ).width() < 425){
        if(window.location.href == 'https://www.tajhotels.com/en-in/' || window.location.href == 'https://www.tajhotels.com/' || 
          window.location.href == 'https://www.seleqtionshotels.com/en-in/' || window.location.href == 'https://www.seleqtionshotels.com/' || 
          window.location.href == 'https://www.vivantahotels.com/en-in/' || window.location.href == 'https://www.vivantahotels.com/' || window.location.href.includes('author-taj-dev65-02.adobecqms.net/content/tajhotels/en-in')){
            $(".cm-page-container .header").css({"position":"fixed","top":"0"});
			$(".banner-container-wrapper").css("margin-top","56px");

        }
    }

    var headerDDInitCon = $('.cm-header-dd-options-con');
    var headerDropdowns = $('.header-warpper .cm-header-dropdowns');
    var headerArrows = $('.header-dropdown-image');
    profileFetchListener(showUserPoints);
	/*To display Tata Neu related header for Loyal customer*/
	displayTataNeuHeaderFooter(); 
 
    var entityLogin = $('#corporate-booking-login').attr('data-corporate-isCorporateLogin') == "true";
    var currentUrl = window.location.href;
    var encodedUri = encodeURIComponent(currentUrl);
   
    var clientID = document.querySelector("meta[name='tdl-sso-client_id']").getAttribute("content");
    if (isCurrencyCacheExists()) {
        var cacheObject = getCurrencyCache()
        setActiveCurrencyInDom(cacheObject.currencySymbol, cacheObject.currency, cacheObject.currencyId);
    } else {
        setActiveCurrencyWithDefaultValues();
    }
    if(window.location.href.indexOf("tajinnercircle") != -1){$(".navbar-expand-lg .navbar-nav .nav-link").css("padding-left","2.1rem");}

	//checkUserDetailsForHeader();

    var urlParams1 = new URLSearchParams(window.location.search);
                    var src1, offer_ID, btype;
    if (urlParams1.has("source")) {
            src1 = urlParams1.get("source");
            offer_ID = urlParams1.get("offerId");
            btype = urlParams1.get("bookingType");     
    }
    if(src1 != null){
        localStorage.setItem("source" , src1);
		sessionStorage.setItem("source" , src1);
        localStorage.setItem("offerId" , offer_ID);
        localStorage.setItem("bookingType" , btype);
    } 
    else if (localStorage.getItem("source") !=null){
        localStorage.setItem("source" , localStorage.getItem("source"));
        localStorage.setItem("offerId" , localStorage.getItem("offerId"));
        localStorage.setItem("bookingType" , localStorage.getItem("bookingType"));
		sessionStorage.setItem("source" , sessionStorage.getItem("source"));
    }                 
    else {               

        localStorage.setItem("bookingType" , "null");
    }

    if(urlParams1.has("utm_source") && urlParams1.has("utm_medium") && urlParams1.has("source") && urlParams1.has("pincode") && 
        urlParams1.has("city") && urlParams1.has("lat") && urlParams1.has("long") ){
            var tataNeuParams = window.location.href.substr(window.location.href.indexOf("utm_source="), window.location.href.indexOf("&long=") + 9);
			tataNeuParams = tataNeuParams.substr(0 , tataNeuParams.indexOf('&authCode'));
            localStorage.setItem("tataNeuParams" , tataNeuParams);
    }



    // --> tdl sso start 
    $('[data-component-id="enrol-btn"]').click(function(){
        //event.preventDefault();
        var signInLink = $('#sign-in-btn a').attr('data-component-id');
        if(signInLink != undefined || signInLink != null){
            $('[data-component-id="enrol-btn"]').attr('href',signInLink+'?clientId='+clientID+'&redirectURL='+encodedUri);
        }else{
            $('[data-component-id="enrol-btn"]').attr('href','https://sit-account.tajhotels.com/login?clientId='+clientID+'&redirectURL='+encodedUri);
        }						

     });
    // --> tdl sso end 
    // --> SSO
    gtmDataLayerFromHeader();

    var user = userCacheExists();
    var isCorporateLogin = false;
    var showSignIN = true;
    hideSignInAndEnroll();
    var ihclSSOToken = $.cookie($(".single-sign-on-sevlet-param-name").text() || 'ihcl-sso-token');
    if (isIHCLCBSite()) {
        console.log('isIHCLCBSite: true');
        if (user && user.isCorporateLogin) {
            isCorporateLogin = user.isCorporateLogin;
            showHeaderUserProfile(user.name);
        } else {
            console.log('user.isCorporateLogin: false');
            dataCache.local.removeData("userDetails");
            clearRoomSelections();
            showSignInAndEnroll();
        }
    } else if (user && user.authToken && !user.isCorporateLogin) {
        console.log('user.authToken: true && isCorporateLogin: false');
        if (user.authToken === ihclSSOToken) {
            console.log('user.authToken === ihclSSOToken: true');
            showHeaderUserProfile(user.name);
        } else if (ihclSSOToken) {
            console.log('ihclSSOToken: true');
            getUserDetailsUsingToken(ihclSSOToken);
        } else {
            console.log('user.authToken === ihclSSOToken: false && ihclSSOToken: false');
            dataCache.local.removeData("userDetails");
            clearSelectionAndLogout();
            showSignInAndEnroll();
        }
    } else if (ihclSSOToken) {
        console.log('ihclSSOToken: true');
        getUserDetailsUsingToken(ihclSSOToken);
    } else {
        console.log('SSO final else condition');
        showSignInAndEnroll();
    }

    function hideSignInAndEnroll() {
        $('.sign-in-btn').addClass('cm-hide');
        $('[data-component-id="enrol-btn"]').addClass('cm-hide');
    }

    function showSignInAndEnroll() {
        $('.sign-in-btn').removeClass('cm-hide');
        $('[data-component-id="enrol-btn"]').removeClass('cm-hide');
        hideProfileDetails();
    }
    function hideProfileDetails(){
      $('.header-profile').addClass('cm-hide').removeClass('cm-show');
     }

    function basOpenForTataNeuCheck(){
        var basVal = (new URLSearchParams(window.location.search)).get('bas');
        if(basVal && basVal.toLowerCase() == 'open'){
            setTimeout(function(){
                if($('.book-stay-btn') && $($('.book-stay-btn')[0])){
                    $($('.book-stay-btn')[0]).trigger('click');
                }
            },1000);

        }
    }

	
	
    function getUserDetailsUsingToken(ihclSSOToken) {
        debugger
        showLoader();
        $.ajax({
            type : "POST",
            url : "/bin/fetchUserDetails",
            data : "authToken=" + encodeURIComponent(ihclSSOToken)
        }).done(function(res) {
            res = JSON.parse(res); 
            if (res.userDetails && res.userDetails.name) {
                updateLoginDetails(res);
                showSignIN = false;
            }
            hideLoader();
        }).fail(function(res) {
        }).always(function() {
            if (showSignIN) {
                showSignInAndEnroll();
            }
            hideLoader();
        });
    }


    function updateLoginDetails(res) {
        if (res.authToken) {
            var userDetails = res.userDetails;
            var authToken = res.authToken;
            incorrectLoginCount = 0;
            successHandler(authToken, userDetails);
        } else if (res.errorCode === "INVALID_USER_STATUS" && res.status === "504" && !entityLogin) {
            // user activation flow
            invokeActivateAccount();
        } else if (res.errorCode === "INVALID_USER_STATUS" && res.status === "506" && !entityLogin) {
            // migrated user
            var error = res.error;
            var errorCtaText = "RESET PASSWORD";
            var errorCtaCallback = invokeForgotPassword;
            $('body').trigger('taj:loginFailed', [ error, errorCtaText, errorCtaCallback ]);
        } else {
            if (entityLogin) {
                forgotPasswordLinkWrp.show();
                $('.ihclcb-login-error').text(res.error).show();
            }
        }
    }
    function successHandler(authToken, userDetails) {
        localUserDetails(authToken, userDetails);
        var id = userDetails.membershipId;
        var name = userDetails.name;
        $('.generic-signin-close-icon').trigger("click");
        $('body').trigger('taj:loginSuccess', [ id, name ]);

        if (id) {
            $('body').trigger('taj:fetch-profile-details', [ true ]);
        } else {
            $('body').trigger('taj:login-fetch-complete');
        }
        if (!entityLogin) { // added by sarath
            $('body').trigger('taj:tier');
        }
        dataToBot();
    }
    function localUserDetails(authToken, userDetails) {
        var user = {
            authToken : authToken,
            name : userDetails.name,
            firstName : userDetails.firstName,
            lastName : userDetails.lastName,
            gender : userDetails.gender,
            email : userDetails.email,
            countryCode : userDetails.countryCode,
            mobile : userDetails.mobile,
            cdmReferenceId : userDetails.cdmReferenceId,
            membershipId : userDetails.membershipId,
            googleLinked : userDetails.googleLinked,
            facebookLinked : userDetails.facebookLinked,
            title : userDetails.title
        };
        if (entityLogin) {
            user.partyId = userDetails.cdmReferenceId
        }
        dataCache.local.setData("userDetails", user);
        if ($('.mr-contact-whole-wrapper').length > 0) {
            window.location.reload();
        }
    }

    // SSO <--

    function isCurrencyCacheExists() {
        var currencyCache = dataCache.session.getData("currencyCache");
        if (!currencyCache)
            return false;
        else
            return true;
    }

    if (deviceDetector.isIE() == "IE11") {
        $(".brand-logo-wrapper img").addClass('.ie-tajLogo-img');
    }

    scrollToViewIn();
    function setActiveCurrencyWithDefaultValues() {
        try {
            var dropDownDoms = $.find('.header-currency-options');
            var individualDropDownDoms = $(dropDownDoms).find('.cm-each-header-dd-item');
            var firstDropDownDom;
            if (individualDropDownDoms && individualDropDownDoms.length) {
                firstDropDownDom = individualDropDownDoms[0];
            }

            var currencyId = $(firstDropDownDom).data().currencyId;
            var currencySymbol = $($(firstDropDownDom).find('.header-dd-option-currency')).text();
            var currency = $($(firstDropDownDom).find('.header-dd-option-text')).text();

            if (currencySymbol != undefined && currency != undefined && currencyId != undefined) {
                setActiveCurrencyInDom(currencySymbol, currency, currencyId);
                setCurrencyCache(currencySymbol, currency, currencyId);
            }
        } catch (error) {
            console.error(error);
        }
    }

    $('.header-warpper .cm-header-dropdowns').each(function() {
        $(this).on('click', function(e) {
            e.stopPropagation();
            var arrow = $(this).closest('.nav-item').find('.header-dropdown-image');
            var target = $(this).closest('.nav-item').find('.cm-header-dd-options-con');
            if (target.hasClass('active')) {
                target.removeClass('active');
                arrow.removeClass('header-dropdown-image-selected');
                $(this).removeClass('nav-link-expanded');
                return;
            }
            headerDropdowns.removeClass('nav-link-expanded')
            headerDDInitCon.removeClass('active');
            headerArrows.removeClass('header-dropdown-image-selected');
            target.addClass('active');
            arrow.addClass('header-dropdown-image-selected');
            $(this).addClass('nav-link-expanded')
        });
    });

    $('body').on('click', function() {
        headerDDInitCon.removeClass('active');
    });

    var windowWidth = $(window).width();
    if (windowWidth < 992) {
        $('.ihcl-header .navbar-toggler').addClass('navbar-dark');
        if (windowWidth < 768) {
            var bookAStayBtn = $('.header-warpper a.book-stay-btn .book-stay-btn')
            if (bookAStayBtn.text().trim() == "Book your dream wedding") {
                bookAStayBtn.text("BOOK A VENUE");
            }
        }
    }

    $('.collapse').on('show.bs.collapse', function() {
        $(".cm-page-container").addClass('prevent-page-scroll');
    });

    $('.header-currency-options').on('click', '.cm-each-header-dd-item', function() {
        try {
            var elDDCurrencySymbol = $(this).find('.header-dd-option-currency');
            var elDDCurrency = $(this).find('.header-dd-option-text');

            var elActiveCurrSymbol = $(this).closest('.nav-item').find('.selected-currency');
            var elActiveCurrency = $(this).closest('.nav-item').find('.selected-txt');

            var currencySymbol = elDDCurrencySymbol.text();
            var currency = elDDCurrency.text();
            var currencyId = $(this).data('currency-id');

            if (currencySymbol != undefined && currency != undefined && currencyId != undefined) {
                setCurrencyCache(currencySymbol, currency, currencyId);
            }

            elActiveCurrSymbol.text(currencySymbol);
            elActiveCurrSymbol.attr("data-selected-currency", currencyId)
            elActiveCurrency.text(currency);
            $(document).trigger('currency:changed', [ currency ]);
        } catch (error) {
            console.error(error);
        }
    });

    $('.profile-name-wrp').click(function(e) {
        e.stopPropagation();
        $('.profile-options').toggle();
        $('.profile-name-wrp .header-dropdown-image').toggleClass('cm-rotate-show-more-icon');
    });

    $('.cm-page-container').click(function() {
        $('.profile-options').hide();
        $('.profile-name-wrp .header-dropdown-image').removeClass('cm-rotate-show-more-icon');
    });

    $('.header-mobile-back-btn').click(function() {
        $('.navbar-collapse').removeClass('show');
        $(".cm-page-container").removeClass('prevent-page-scroll');
    })

    $('.sign-in-btn').click(function() {
        var currentUrl = window.location.href;
        var encodedUri = encodeURIComponent(currentUrl);
        var signInLink = $('#sign-in-btn a').attr('data-component-id');	
        var clientID = document.querySelector("meta[name='tdl-sso-client_id']").getAttribute("content");
        if(!userLoggedIn()){
            if(signInLink != undefined || signInLink != null){
            $('.sign-in-btn > .nav-link').attr('href',signInLink+'?clientId='+clientID+'&redirectURL='+encodedUri); 
            }
            else{
                $('.sign-in-btn > .nav-link').attr('href', selectLoginUrlEnv() + '?clientId='+clientID+'&redirectURL='+encodedUri);  
            }
        }
        else{
            document.location.reload();
        }
    });

    $('body').on('taj:loginSuccess', function(event,uname) {
        showHeaderUserProfile(uname);
    });

    $('body').on('taj:pointsUpdated', function(event) {
        showUserPoints();
    });

    function showHeaderUserProfile(name) {
        $('.sign-in-btn').addClass('cm-hide');
        $('.header-profile').removeClass('cm-hide').addClass('cm-show');
        $('.header-profile .profile-username, .navbar-brand .profile-username').text(name);
        showUserPoints();
    }

    function showUserPoints() {
        var userDetails = dataCache.local.getData("userDetails");
        if (userDetails && userDetails.brandData && userDetails.brandData.ticNumber && userDetails.brandData.ticNumber[0]) {
            $('.header-profile .points-cont').removeClass('d-none');
            $('[data-component-id="enrol-btn"]').remove(); // remove enrol buttons for users having
            // membership id
            $('.header-profile .edit-profile').hide();
            if (userDetails.loyaltyInfo && userDetails.loyaltyInfo[0].currentSlab) {
                $('.header-profile .tic-tier span').text(userDetails.loyaltyInfo[0].currentSlab);
                $('.header-profile .tic-tier').show();
            } else {
                $('.header-profile .tic-tier').hide();
            }
            if (userDetails.loyaltyInfo && userDetails.loyaltyInfo[0].currentSlab) {
            $('.header-profile .tic-points').text(parseInt(userDetails.loyaltyInfo[0].loyaltyPoints));
            }
            
            if (userDetails.brandData) {
                
                accountType = "tic-points";  
                $('.prof-content-value').each(
                        function() {
                            $(this).attr("id") === accountType ? $(this).parent().show() : $(this)
                                    .parent().hide();
                        });

            
                $('.prof-tic-content').show();
            } else {
                console.log("unable to retrieve user card details");
                $('.prof-tic-content').hide();
            }
        } else {
            $('.header-profile .points-cont').addClass('d-none');
        }
		if(sessionStorage.getItem("source") == 'tcp'){
			$('.header-profile #logout-btn').addClass('d-none');
		}
    }
    /*tdl sso changes start */

    $('.header-profile .logout-btn').on('click', function(event) {
        event.stopPropagation();

        checkToClearSelections();
    });


    $('body').on('taj:logout', function() {
        tajLogout();
    });
    $('body').on('taj:sessionLogout', function(){
		logoutWithoutReloding();
    });

    function checkToClearSelections() {
        var bOptions = dataCache.session.getData('bookingOptions');
        if (bOptions.selection && (bOptions.selection.length > 0)) {
            var popupParams = {
                title : $(".sign-out-clear-selections-popupMessage").text()
                || 'Sign Out will clear room slections?',
                callBack : clearSelectionAndLogout.bind(),
                // callBackSecondary: secondaryFn.bind( _self ),
                needsCta : true,
                isWarning : true
            }
            warningBox(popupParams);
        } else {
            tajLogout();
        }
    }

    function clearSelectionAndLogout() {
        clearRoomSelections();
        tajLogout();
    }

    function clearRoomSelections() {
        var boptions = dataCache.session.getData("bookingOptions");
        if (boptions && boptions.roomOptions) {
            var rOptions = boptions.roomOptions;
            var roomOptArray = [];
            for (var d = 0; d < rOptions.length; d++) {
                var roomOpt = {
                    adults : rOptions[d].adults,
                    children : rOptions[d].children,
                    initialRoomIndex : d
                };
                roomOptArray.push(roomOpt);
            }
            boptions.previousRooms = roomOptArray
            boptions.roomOptions = roomOptArray;
            boptions.rooms = boptions.roomOptions.length;
            boptions.selection = [];
            dataCache.session.setData("bookingOptions", boptions);
        }
    }

    function tajLogout() {
        typeof tdlsignOut != 'undefined' ? tdlsignOut() : '';
        typeof logoutBot != 'undefined' ? logoutBot() : '';
        typeof facebookLogout != 'undefined' ? facebookLogout() : '';
        typeof googleLogout != 'undefined' ? googleLogout() : '';
		showSignInAndEnroll();
    }

    function googleLogout() {
        try {
            var auth2 = gapi.auth2.getAuthInstance();
            auth2.signOut().then(function() {
                console.info('User signed out.');
            });
        } catch (error) {
            console.error("Attempt for google logout failed.")
            console.error(error);
        }
    }

    function facebookLogout() {
        try {
            FB.logout(function(response) {
                // user is now logged out
                console.info("user is now logged out");
            });
        } catch (error) {
            console.error("Attempt for facebook logout failed.")
            console.error(error);
        }
    }
    function logoutSuccess1(accessTk) {
        logoutWithoutReloding(accessTk);
        //formTheRedirectionURL(redirectUrl);
        //    document.location.reload();
    }
    function logoutWithoutReloding(accessTkn) {
        var isCorporateLogin = userCacheExists() ? userCacheExists().isCorporateLogin : false;       
        showSignInAndEnroll();
		logoutBot();
		
        if (!isCorporateLogin) {  
            /*tdl sso logout function call*/   
			if(localStorage.getItem("access_token")){
				tdlsignOut();
			}
        } else {
            dataCache.session.removeData("ihclCbBookingObject");
			dataCache.local.removeData("userDetails");
			localStorage.removeItem("access_token");
			localStorage.removeItem("refresh_token");
			localStorage.removeItem("user");
			localStorage.removeItem("auth_code");
			deleteCookiesSSO();
        }
    }

    
    var tdlsignOut = logoutAccessToken => {
				tdlSsoAuth.deleteSession(localStorage.getItem('access_token')).then(function(response){
					console.log("response",response);									
					if (response){ 
						location.reload();						
					}					
				});
				dataCache.local.removeData("userDetails");
				localStorage.removeItem("access_token");
				localStorage.removeItem("refresh_token");
				localStorage.removeItem("user");
				localStorage.removeItem("auth_code");
				if(window.location.href.includes('tataneu/My-Profile') || window.location.href.includes('tataneu/my-profile')){
						window.location.href="https://www.tajhotels.com/en-in/tataneu/";
				}else if(window.location.href.includes('neupass/my-profile')){
						window.location.href="https://www.tajhotels.com/en-in/neupass/";
				}else if(window.location.href.includes('tajinnercircle/My-Profile')|| window.location.href.includes('tajinnercircle/my-profile')){
						window.location.href="https://www.tajhotels.com/en-in/tajinnercircle/";
				}	
				deleteCookiesSSO();			
            }
	const selectEnv = (href) => {
		href =  href ?  href : window.location.href;
		if (href.includes('localhost') || href.includes('0.0.0.0')) return 'http://localhost:8080/api/v1';	
		if (href.includes('taj-dev65-02')) return 'https://ppapi.tatadigital.com/api/v2/sso';
		if (href.includes('dev')) return 'https://ppapi.tatadigital.com/api/v2/sso';
		if (href.includes('stage')) return 'https://sapi.tatadigital.com/api/v1/sso';
		return 'https://api.tatadigital.com/api/v2/sso';
	} 
		
	 

});

	if (typeof selectLoginUrlEnv == 'undefined') {
		const selectLoginUrlEnv = (href) => {
				href =  href ?  href : window.location.href;
				if (href.includes('localhost') || href.includes('0.0.0.0')) return 'https://sit-r2-account.tatadigital.com/v2/';	
				if (href.includes('taj-dev65-02')) return 'https://sit-r2-account.tatadigital.com/v2/';
				if (href.includes('dev')) return 'https://sit-r2-account.tatadigital.com/v2/';
				if (href.includes('stage')) return 'https://sit-r2-account.tatadigital.com/v2/';
				return 'https://members.tajhotels.com/v2/';
		}
	}

function getSelectedCurrency() {
    return dataCache.session.getData("selctedCurrency");
}

function getCurrencyCache() {
    return dataCache.session.getData("currencyCache");
}

function setActiveCurrencyInDom(currencySymbol, currency, currencyId) {

    $($.find("[data-inject-key='currencySymbol']")[0]).text(currencySymbol);
    $($.find("[data-inject-key='currency']")[0]).text(currency);
    $($.find("[data-selected-currency]")[0]).attr("data-selected-currency", currencyId);
}

function setCurrencyCache(currencySymbol, currency, currencyId) {
    var currencyCache = {};
    currencyCache.currencySymbol = currencySymbol;
    currencyCache.currency = currency;
    currencyCache.currencyId = currencyId;
    dataCache.session.setData("currencyCache", currencyCache);
}

function setCurrencyCacheToBookingOptions() {
    var bookingOptions = getBookingOptionsSessionData();
    bookingOptions.currencySelected = dataCache.session.getData('currencyCache').currencyId;
    dataCache.session.setData("bookingOptions", bookingOptions);
}

function setActiveCurrencyWithResponseValue(currencyType) {

    var infor = false;
    var dropDownDoms = $.find('.header-currency-options');
    var individualDropDownDoms = $(dropDownDoms).find('.cm-each-header-dd-item');
    var firstDropDownDom;
    if (individualDropDownDoms && individualDropDownDoms.length) {
        for (var m = 0; m < individualDropDownDoms.length; m++) {
            if ($(individualDropDownDoms[m]).data().currencyId == currencyType) {
                firstDropDownDom = individualDropDownDoms[m];
                infor = true;
            }
        }
    }
    if (firstDropDownDom) {
        var currencyId = $(firstDropDownDom).data().currencyId;
        var currencySymbol = $($(firstDropDownDom).find('.header-dd-option-currency')).text();
        var currency = $($(firstDropDownDom).find('.header-dd-option-text')).text();

        if (currencySymbol != undefined && currency != undefined && currencyId != undefined) {
            setActiveCurrencyInDom(currencySymbol, currency, currencyId);
            setCurrencyCache(currencySymbol, currency, currencyId);
            setCurrencyCacheToBookingOptions();
        }
    }
    return infor;
}

function formTheRedirectionURL(authoredURL) {
    var url = authoredURL;
    if (!isIHCLCBSite() && !url.includes('https')) {
        var url = url + ".html"
    } else if (isIHCLCBSite()) {
        dataCache.session.removeData("ihclCbBookingObject");
    }
    window.location.href = url;
}
function stopAnchorPropNav(obj) {
    if (window.location.href.includes('en-in/taj-air')) {
        var attr = obj.text;
        prepareQuickQuoteJsonForClick(attr);
    }
    return true;
}

function scrollToViewIn() {
    console.log('binded');
    var scrollElem = $(".scrollView");
    if(scrollElem && scrollElem.length > 0) {
        $(".scrollView").each(function(){
            $(this).on('click', function() {
                var classStr = $(this).attr('class').slice(11);
                $('html, body').animate({
                    scrollTop: $('#'+classStr).offset().top
                }, 1000);
            });
        });
    }
}


//updated for global data layer.
function gtmDataLayerFromHeader(){
    $('#navbarSupportedContent .navbar-nav>.nav-item>a').each(function(){
        $(this).click(function(){
            var eventType = "" ;                 
			switch($(this).text().toLowerCase()) {
              	case 'home':
					eventType = 'TopMenu_KnowMore_HomePage_Home';
                	break;
              	case 'benefits':
					eventType = 'TopMenu_KnowMore_HomePage_Benefits';
                	break;
            	case 'epicure':
					eventType = 'TopMenu_KnowMore_HomePage_Epicure';
                	break;
            	case 'redeem':
					eventType = 'TopMenu_KnowMore_HomePage_Redeem';
                	break;
                case 'events':
                    eventType = 'TopMenu_KnowMore_HomePage_Events';
                	break;
                case 'our hotels':
					eventType = 'TopMenu_KnowMore_HomePage_OurHotels';
               		break;
            	case 'help':
					eventType = 'TopMenu_KnowMore_HomePage_Help';
               		break;
            	case 'enrol':
        			eventType = 'TopMenu_Enrollment_HomePage_TICEnrol';
               		break;
            	case 'sign in':
					eventType = 'TopMenu_SignIn_HomePage_SignIn';
               		break;
              	default:
        			eventType = '';
            }
        	if(eventType){
        		addParameterToDataLayerObj(eventType, {});
            }
        });
    });
}

function displayTataNeuHeaderFooter(){
	   var userDetails =getUserData();
		if (userDetails && userDetails.loyalCustomer == 'Y') {
			var tataneuText = ['NeuPass',''];
			var tataneuLinks = ['https://www.tajhotels.com/en-in/neupass/', '']
			$('.NonloyalCustomerData li').each(function(index, value) {
                if($(this).children().text() == 'Taj InnerCircle'){
                    $(this).children().attr('href', tataneuLinks[0]);
					$(this).children().text(tataneuText[0]);
                }
				/*if (index == 0) {
					$(this).children().attr('href', tataneuLinks[index]);
					$(this).children().text(tataneuText[index]);
				}*/
			})
             var url=window.location.href.split('?')[0];

            if(url=="https://www.tajhotels.com/en-in/tajinnercircle/")
            {
                window.location.replace("https://www.tajhotels.com/en-in/neupass/");
            }
			$(".prof-content-title").text("NeuCoins")

			if(window.location.href.includes("tajhotels.com") || window.location.href.includes("seleqtionshotels.com") || 
			window.location.href.includes("vivantahotels.com") || window.location.href.includes("amastaysandtrails.com")){
				$(".loyalCustomerData a").attr('href','https://www.tajhotels.com/en-in/neupass/my-profile/');
				$("#header-profile .profile-default-options a").attr('href','https://www.tajhotels.com/en-in/neupass/my-profile/');
			}else{
				$(".loyalCustomerData a").attr('href','/en-in/neupass/my-profile/');
				$("#header-profile .profile-default-options a").attr('href','/en-in/neupass/my-profile/');
			}
			// && (userDetails.neuPassInfo == null || userDetails.neuPassInfo.status == 'active')
			if(userDetails.isGdprCustomer!= 'true'){
                typeof(showNeupassStrip) != 'undefined' ? showNeupassStrip('NeupassActive') : '';
			}
			else if(userDetails.isGdprCustomer == 'true' && (userDetails.neuPassInfo && userDetails.neuPassInfo.status != 'active')){
                    typeof(showNeupassStrip) != 'undefined' ? showNeupassStrip('NeupassInactive') : ''; 
            }
            if(userDetails && userDetails.neuPassInfo && userDetails.neuPassInfo.status == 'cancelled'){
                 if(sessionStorage.getItem('source') == 'tcp'){
                     if(window.location.href.includes('dev65') || window.location.href.includes('stage65')){
                         	tdlsignOut();
                            setTimeout(function(){window.location.href="https://aem-sit-r2.tatadigital.com/getbacktohomepage";},500);
                        	return;
                        }
                    	tdlsignOut();
                     	setTimeout(function(){window.location.href="https://www.tatadigital.com/getbacktohomepage";},300);
                }else{
                    typeof tdlsignOut === 'function' ?  tdlsignOut() : '';
                }
            }
            if($('.carousel-inner') && $('.carousel-inner').find('[id^="cb-"]') && !$('.carousel-inner').find('[id^="cb-"]').attr('data-context')){
                    if($('.carousel-item[data-context]') && $('.carousel-item[data-context]').length)
                   		 $('body').trigger('taj:update-banner-onlogin');
           }
		}else{
			if(!userDetails){
				typeof(showNeupassStrip) != 'undefined' ? showNeupassStrip('guest') : '';
			}
		}
	}
	function changeApplyNow() {
        console.log("APPLY NOW");
        const allLinks = $('.cm-each-header-dd-item a');

        for (let i = 0 ; i < allLinks.length; i++) {
            if(allLinks[i].innerHTML.toLowerCase() == 'apply now') {
                $(allLinks[i]).attr('target','_blank');
            }
        }
    }



var contextualBanners;

if(!contextualBanners)
    contextualBanners = [];

$(document).ready(
        function() {
//            ihclImageCarousel();
            hideControlsMobile();
            hideControlsSingleBanner();

            $("#bannerCarousel").on("slid.bs.carousel", "", hideControlsMobile);


                var isSafari = navigator.userAgent.indexOf('Safari') != -1 && navigator.vendor ==  "Apple Computer, Inc.";
                if (isSafari && document.getElementById("videoPlaySafari")){
                    document.getElementById("videoPlaySafari").style.visibility = "visible";
                } 

                var videoPlaySafari = document.getElementById("videoPlaySafari");
                if(videoPlaySafari){
                $("#videoPlaySafari").on("touchstart click",function(){
                    var vid = document.getElementById("videoAudio");
                    //vid.play();
                    document.getElementById("videoPlaySafari").style.display = "none";
                        /*  if(vid.muted){
                        var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/mute-48.png";
                            vid.muted = false;
                        }else{
                            var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/volume-up-2-48.png";
                            vid.muted = true;
                        }
                        */
                     var playPromise = vid.play();
                      if (playPromise !== undefined) {
                        playPromise.then(function(d) {
                          document.getElementById("videoPlaySafari").style.display = "none";
                          if(vid.muted){
                        var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/mute-48.png";
                            vid.muted = false;
                        }else{
                            var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/volume-up-2-48.png";
                            vid.muted = true;
                        }
                        }, function(err){
							console.log('auto play is muted');
                        })
                    }
                    return false;
                });
                }
    
                var muteVideo = document.getElementById("muteVideo");
                if(muteVideo){
                $("#muteVideo").on("touchstart click",function(){
                    var vid = document.getElementById("videoAudio");
                    vid.play();
                     if(vid.muted){
                        var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/mute-48.png";
                            vid.muted = false;
                        }else{
                            var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/volume-up-2-48.png";
                            vid.muted = true;
                        }
                     /*var playPromise = vid.play();
                      if (playPromise !== undefined) {
                        playPromise.then(_ => {
                          if(vid.muted){
                        var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/mute-48.png";
                            vid.muted = false;
                        }else{
                            var volumeImage = document.getElementById("muteVideo");
                            volumeImage.src= "/content/dam/tajhotels/icons/style-icons/volume-up-2-48.png";
                            vid.muted = true;
                        }
                        })
                        .catch(error => {
                          // Auto-play was prevented
                          // Show paused UI.
                        });
                    }*/
                    return false;
                });
                }

           /* if(document.getElementById("fullHeight")){

			var fullheight= document.getElementById("fullHeight").value;
            console.log(fullheight);
            if( fullheight=="true")
            {
                $(".carousel, .mr-carousel-wrap, .mr-carousel-wrap .banner-carousel-each-wrap .bannerImage img, .mr-carousel-wrap .banner-carousel-each-wrap, .mr-carousel-wrap img.img-hotel, .banner-carousel>.banner-container-wrapper>.hotel-carousel-section .carousel-item").css('height', '93vh');


                $(".carousel",".mr-carousel-wrap",".mr-carousel-wrap .banner-carousel-each-wrap img",
                 ".mr-carousel-wrap .banner-carousel-each-wrap",".mr-carousel-wrap img.img-hotel",
                 "#bannerCarousel .carousel-item").css("height","93vh");


            }

            }*/


            // hide left, right control on mobile viewport
            function hideControlsMobile() {
                var $this = $("#bannerCarousel");
                if (window.matchMedia('(max-width: 767px)').matches) {
                    $this.children(".carousel-control-prev").hide();
                    $this.children(".carousel-control-next").hide();
                }
            }
            ;

            // hide controls if there is a single banner
            function hideControlsSingleBanner() {
                var $this = $("#bannerCarousel");
                var banners = $this.find(".carousel-item");
                var indicators = $this.find(".carousel-indicators");
                if (banners.length === 1) {
                    indicators.hide();
                    $this.children(".carousel-control-prev").hide();
                    $this.children(".carousel-control-next").hide();
                }
            }
			// show controls if there is a single banner
            function showControlsBanner() {
                var $this = $("#bannerCarousel");
                var banners = $this.find(".carousel-item");
                var indicators = $this.find(".carousel-indicators");
                if (banners.length > 1) {
                    indicators.show();
                    $this.children(".carousel-control-prev").show();
                    $this.children(".carousel-control-next").show();
                }
            }
			

            if (contextualBanners.length > 0) {
                profileFetchListener(updateContextualBanner)
                //if (userCacheExists()) {
                    updateContextualBanner();
                //}
            }

            // Login related
            if ($("#bannerCarousel").data("login-support")) {
                //registerLoginListener(updateUserCarousel);
                if (userCacheExists()) {
                    updateUserCarousel();
                }
				showControlsBanner();
            }

            // Update the first banner slide with user name
            function updateUserCarousel() {
                var banner = $("#bannerCarousel");
                var userData = getUserData();
               	var userBannerIndex = 0;
				if(userData && userData.loyalCustomer=='Y'){
						userBannerIndex = 0;												
				}
				var firstSlide = banner.find(".carousel-item").get(userBannerIndex);
				if(userData.nameDetails){
					userData.nameDetails.salutation = userData.nameDetails.salutation ? userData.nameDetails.salutation : "";
					$($(firstSlide).find(".banner-titles .cm-header-label")[0]).text(userData.nameDetails.salutation + ' ' + userData.nameDetails.firstName + ' '+  userData.nameDetails.lastName );
					var userData = getUserData();
					userData.tier = userData.loyaltyInfo && userData.loyaltyInfo.length > 0 ? 
					(userData.loyaltyInfo[0].currentSlab ? userData.loyaltyInfo[0].currentSlab : '') : '';
					userData.tier = userData.tier == "Copper*" ? "Copper": userData.tier;					
					
					if($($(firstSlide).find(".mr-banner-btn-anc")[userBannerIndex])){
						$($(firstSlide).find(".banner-titles .holidays-selection-text")[0]).html("<img src='/content/dam/tajhotels/icons/style-icons/tick.svg' width='20'><span> You are a "+userData.tier+" Member</span>");
						if(window.location.href.indexOf("en-in/tajinnercircle") != -1){
							$($(firstSlide).find(".mr-banner-btn-anc")[0]).attr('href','/en-in/tajinnercircle/My-Profile/');
						}else if(window.location.href.indexOf("en-in/tataneu") != -1 ){
							$($(firstSlide).find(".mr-banner-btn-anc")[0]).attr('href','/en-in/tataneu/my-profile/');
						}else if(window.location.href.indexOf("en-in/neupass") != -1){
							$($(firstSlide).find(".mr-banner-btn-anc")[0]).attr('href','/en-in/neupass/my-profile/');
						}
					}
				}
				$($('.banner-carousel-each-wrap')[userBannerIndex]).find('.mr-innerCircle-member-offers .holidays-selection-text').removeClass('mobile-display-none')
				$('#bannerCarousel').carousel(0);
            }
		

            function updateContextualBanner() {
                var userData = getUserData();
				if(userData){
					userData.tier = userData.loyaltyInfo && userData.loyaltyInfo.length > 0 ? userData.loyaltyInfo[0].currentSlab : '';
					userData.tier = userData.tier == "Copper*" ? "Copper": userData.tier;
				}
                contextualBanners.forEach(function(banner) {
                    if (userData && userData.tier && banner.context.toLowerCase().includes(userData.tier.toLowerCase())) {
                        $("#bannerCarousel .carousel-inner").prepend(banner.dom);
					   //$( banner.dom ).insertAfter($($("#bannerCarousel .carousel-inner").children())[0] ); 
                        var ind = $('#bannerCarousel .carousel-indicators li');
                        $('#bannerCarousel .carousel-indicators').append('<li data-target="#bannerCarousel" data-slide-to="' + (ind.length) + '"></li>');
                    }else if(!banner.context && !userData){
						$("#bannerCarousel .carousel-inner").prepend(banner.dom);
                        var ind = $('#bannerCarousel .carousel-indicators li');
                        $('#bannerCarousel .carousel-indicators').append('<li data-target="#bannerCarousel" data-slide-to="' + (ind.length) + '"></li>');						
					}
                    
					$('#bannerCarousel').carousel(0);
                });
                
            }

            $('body').on('taj:update-banner-onlogin', function() {
                updateContextualBanner();
                updateUserCarousel();
            });


            getBannerDataForDataLayer();
        });

function registerContextualBanner(contextBannerKey, context) {
    var banner = document.getElementById(contextBannerKey);
    var obj = {
        context : context,
        dom : banner
    };
    contextualBanners.push(obj);
}


//updated for global data layer
function getBannerDataForDataLayer(){
    $('.mr-visit-hotel').each(function(){
        $(this).click(function(){
            try {
                var carousalBtnTxt = $(this).text().split(' ').join('');
                var bannerLabel = $(this).parent('a').siblings('.cm-header-label').text().split(' ').join('');
                var eventName =  bannerLabel+'_CarouselBanner_'+carousalBtnTxt+'_HomePage_'+carousalBtnTxt;
                addParameterToDataLayerObj(eventName, {});
            }
            catch(err){
				console.log('error in creating eventName');
            }
        });
	});

}
$(document).ready(function() {
    setDateInBanner();
    setTempInBanner();
});

function setDateInBanner() {
    try {
        var apiKey = $('.hotel-carousel-section').data('apikey');
        var hotellat = $('#banner-temperature').data('hotellat');
        var hotellon = $('#banner-temperature').data('hotellon');

        if (hotellat != undefined && hotellon != undefined) {
            var queryURL = "https://api.openweathermap.org/data/2.5/weather?lat=" + hotellat + "&lon=" + hotellon
                    + "&appid=" + apiKey + "&units=metric";

            $.getJSON(queryURL, function(data) {
                var temp = data.main.temp;
                var tempRound = parseFloat(temp).toFixed();
                if (tempRound != 'NaN') {
                    $('#bannerCarousel #temperature-update').append(tempRound);
                } else {
                    $('.hotel-banner-temperature').hide();
                }
            });
        }
    } catch (error) {
        console.log("Lat and long can't found.");
    }
}
function setTempInBanner() {
    try {
        var currentDate = moment(new Date()).format('Do MMM YYYY');
        $('#bannerCarousel').find('.banner-date').text(currentDate);
    } catch (error) {
        console.log("Setting Date in banner failed.");
    }
}

var availabilityObj = {
    initialSelecton : '',
    isCheckParamsUpdated : false,
    isRoomTypeUpdated : false
};
var domainChangeFlag = false;
var isToDateClickedTriggered;
bookedRoomsCount = 0;
var isTajHolidays = false;
var isAmaCheckAvailability = false;
var isAmaSite = false;
var amaBookingObject = {};
var shouldInvokeCalendarApiBas = false;
$('document').ready(
        function() {
            try {
                isAmaSite = $('.cm-page-container').hasClass('ama-theme');

				dataCache.session.setData("sameDayCheckout", $('.mr-hotel-details').attr('data-samedaycheckout'));

//                sameDayCheckout = $('.mr-hotel-details').attr('data-samedaycheckout');
//               console.log("sameDayCheckout::::::::", sameDayCheckout);

                initializeCheckAvailability();
                initializeDatePicker();
                disableBestAvailableButton();
                // setBookAStaySessionObject();
                autoPopulateBookAStayWidget();
                if (!verifyIfRoomsPage()) {
                    fetchDateOccupancyParametersFromURL();
                }

                _globalListOfPromoCode = getPromoCodeFromData();
                var url = window.location.href;
                if (($('#page-scope').attr('data-pagescope') == 'Taj Holidays')
                        || (url && url.indexOf('taj-holiday-redemption') != -1)) {
                    checkHolidayScope()
                    isTajHolidays = true;
                }
                if (dataCache.session.getData('bookingDetailsRequest')) {
                    bookedOptions = JSON.parse(dataCache.session.getData('bookingDetailsRequest'));
                    bookedCheckInDate = moment(bookedOptions.checkInDate, "YYYY-MM-DD").format("MMM Do YY");
                    bookedCheckOutDate = moment(bookedOptions.checkOutDate, "YYYY-MM-DD").format("MMM Do YY");
                    bookedAdultsOccupancy = bookedOptions.roomList[0].noOfAdults;
                    bookedChildrenOccupancy = bookedOptions.roomList[0].noOfChilds;
                    bookedRoomsCount = bookedOptions.roomList.length || 0;
                }
                if ((window.location.href.indexOf('rooms-and-suites') != -1) || isTajHolidays
                        || $('.cm-page-container').hasClass('destination-layout')) {
                    dateOccupancyInfoSticky();
                }

                // [IHCL_CB START]
                initIHCLCBBookAStay();
                // [IHCL_CB ENDS]

            } catch (error) {
                console.error("Error in /apps/tajhotels/components/content/book-a-stay/clientlibs/js/book-a-stay.js ",
                        error.stack);
            }

			
			shouldInvokeCalendarApiBas = false;
            if(document.getElementById("shouldInvokeCalendarApiBas"))
			var shouldInvokeCalendarApiBas = document.getElementById("shouldInvokeCalendarApiBas").value;
				if(shouldInvokeCalendarApiBas){
                    //***Removing Ama Calendar rates modified****///
                    var getPathName = window.location.pathname;
                    var getHostName = window.location.hostname;
                    if(getHostName == 'www.amastaysandtrails.com' || getPathName.includes('/content/ama')){
                        return;
                    } ///*** changes end ****///
					amacacalendarPricingBas();
					bindNextPrevClickAmaBas();
				}
			if($("#hotelIdFromSearch").text() == ''){
				$('.searchbar-input').val("")
			}
        });

function initIHCLCBBookAStay() {
    if (isIHCLCBSite()) {
        fetchIHCLCBEntityDetails();
        addEntityDropDownEventsForIHCLCB();
    }
}

function fetchDateOccupancyParametersFromURL() {
    try {
        var bookingOptions = {};
        var _globalPromoCode = {
            name : null,
            value : null
        };
        var checkInDate = getQueryParameter('from');
        var checkOutDate = getQueryParameter('to');
        var rooms = getQueryParameter('rooms');
        var adults = getQueryParameter('adults');
        var children = getQueryParameter('children');
        if (checkInDate && checkOutDate) {
            var nights = moment(checkOutDate, "DD.MM.YYYY").diff(moment(checkInDate, "DD.MM.YYYY"), 'days');
            checkInDate = moment(checkInDate, 'DD/MM/YYYY').format('MMM Do YY');
            checkOutDate = moment(checkOutDate, 'DD/MM/YYYY').format('MMM Do YY');
            bookingOptions.fromDate = checkInDate;
            bookingOptions.toDate = checkOutDate;
            bookingOptions.nights = parseInt(nights)

        }
        if (rooms && adults && children) {
            if (validateRoomsQueryParams(rooms, adults, children)) {
                var roomOptions = [];
                var adultsArr = adults.split(",");
                var childArr = children.split(",");
                for (var index = 0; index < rooms; index++) {
                    roomOptions.push({
                        "adults" : adultsArr[index],
                        "children" : childArr[index],
                        "initialRoomIndex" : index
                    });
                }
                bookingOptions.roomOptions = roomOptions;
            }
        }
        if (checkInDate && checkOutDate && rooms && adults && children) {
            bookingOptions.isAvailabilityChecked = true;
            if (bookingOptions.rooms == 0) {
                bookingOptions.rooms = 1;
            }
            bookingOptions.previousRooms = bookingOptions.roomOptions;
            bookingOptions.previousDates = {
                fromDate : bookingOptions.fromDate,
                toDate : bookingOptions.toDate
            };
            bookingOptions.selection = [];
            bookingOptions.promoCode = _globalPromoCode.value;
            bookingOptions.promoCodeName = _globalPromoCode.name;
            bookingOptions.hotelChainCode = null;
            bookingOptions.hotelId = null;
            var redirectFromAmp = getQueryParameter('redirectFromAmp');
            if (redirectFromAmp) {
                var promoCode = getQueryParameter('promoCode');
                var hotelId = getQueryParameter('hotelId');
                var targetEntity = getQueryParameter('targetEntity');
                var isAvailabilityChecked = getQueryParameter('isAvailabilityChecked');
                if (!promoCode) {
                    promoCode = "";
                }
                bookingOptions.promoCode = promoCode;
                if (!hotelId) {
                    hotelId = null;
                }
                bookingOptions.hotelId = hotelId;
                if (!targetEntity) {
                    targetEntity = null;
                }
                bookingOptions.targetEntity = targetEntity;
                if (!isAvailabilityChecked) {
                    isAvailabilityChecked = false;
                }
                bookingOptions.isAvailabilityChecked = isAvailabilityChecked;
            }
            dataCache.session.setData('bookingOptions', bookingOptions);
            updateCheckAvailability();
            removeDateOccupancyParamFromUrl();
        }
    } catch (err) {
        console.error(err);
    }
}

function validateRoomsQueryParams(rooms, adults, children) {
    var isValid = false;
    if (isInt(rooms)) {
        if (rooms > 0 && rooms <= 5) {
            if (adults.split(",").length == rooms && children.split(",").length == rooms) {
                if (isOccupantsParamValidFor(adults, 1, 7) && isOccupantsParamValidFor(children, 0, 7)) {
                    isValid = true;
                } else {
                    isValid = false;
                    console
                            .error("Non Integer parameters passed in Adults/Children or Min/Max Adults[1,7]/Childrens[0,7] occupancy validation failed");
                }
            } else {
                isValid = false;
                console.error("No of Adults and Childrens not matching with No of Rooms");
            }
        } else {
            isValid = false;
            console.error("Min/Max No of Rooms [1,5] validation failed");
        }
    } else {
        isValid = false;
        console.error("Invalid Input Parameter passed as rooms");
    }
    return isValid;
}

function isOccupantsParamValidFor(occupants, minValue, maxValue) {
    var isValid = occupants.split(",").every(function(x) {
        if (isInt(x)) {
            if (x >= minValue && x <= maxValue) {
                return true;
            } else {
                return false;
            }
        } else {
            return false;
        }
    });
    return isValid;
}

function verifyIfRoomsPage() {
    var presentUrl = window.location.href;
    if (presentUrl.includes("rooms-and-suites") || presentUrl.includes("accommodations")
            || presentUrl.includes("booking-cart")) {
        return true;
    }
    return false;
}

function removeDateOccupancyParamFromUrl() {
    /*Check if not Ginger hotels*/
    if(typeof searchHotelId != 'undefined' && searchHotelId != "99999"){
        var presentUrl = window.location.href;
        var paramsToRemoveArr = [ "from", "to", "rooms", "adults", "children", "overrideSessionDates" ];
        var refinedUrl = '';
        paramsToRemoveArr.forEach(function(param, index) {
            presentUrl = removeURLParameter(presentUrl, param);
        });
        refinedUrl = presentUrl;
        window.history.replaceState({}, document.title, refinedUrl);
	}
}

function removeURLParameter(url, parameter) {
    var urlparts = url.split('?');
    if (urlparts.length >= 2) {

        var prefix = encodeURIComponent(parameter) + '=';
        var pars = urlparts[1].split(/[&;]/g);

        for (var i = pars.length; i-- > 0;) {
            if (pars[i].lastIndexOf(prefix, 0) !== -1) {
                pars.splice(i, 1);
            }
        }
        return urlparts[0] + (pars.length > 0 ? '?' + pars.join('&') : '');
    }
    return url;
}

function isInt(value) {
    return !isNaN(value) && (function(x) {
        return (x | 0) === x;
    })(parseFloat(value))
}

/*
 * If query params contains redirectFromAmp, we initialize the bookingOptions from query params.
 */
function getBookAStayUrlParams() {
    try {
        if (URLSearchParams) {
            var params = new URLSearchParams(location.search);
            if (params.has("redirectFromAmp")) {
                var fromDate = checkFalseString(params.get("fromDate"))
                        || moment(new Date()).add(1, 'days').format("MMM Do YY");
                //var toDate = checkFalseString(params.get("toDate")) || moment(new Date()).add(2, 'days').format("MMM Do YY");

				var toDate = checkFalseString(params.get("toDate")) || initialBookingSetup();

                   bookingOptions = {
                    fromDate : fromDate,
                    toDate : toDate,
                    rooms : 1,
                    nights : moment(toDate, "MMM Do YY").diff(moment(fromDate, "MMM Do YY"), 'days'),
                    roomOptions : [ {
                        adults : checkFalseString(params.get("adults")) || 1,
                        children : checkFalseString(params.get("children")) || 0,
                        initialRoomIndex : 0
                    } ],
                    selection : [],
                    promoCode : checkFalseString(params.get("promoCode")) || "",
                    hotelId : checkFalseString(params.get("hotelId")) || null,
                    targetEntity : checkFalseString(params.get("targetName")) || null,
                    isAvailabilityChecked : false
                };

                dataCache.session.setData("bookingOptions", bookingOptions);
            }
        }
    } catch (error) {
        console.error(error);
    }
}

// Value returned from URLSearchParams can be "null" so explicit check for that.
function checkFalseString(value) {
    if (value !== "null") {
        return value;
    }
    return false;
}

function getPromoCodeFromData() {
    var promoCodeList = $($.find("[data-promo-code]")[0]).data();
    if (promoCodeList) {
        return promoCodeList.promoCode.promoCodes;
    } else {
        $('.bas-specialcode-container').remove();
    }
    return null;
}

function initializeCheckAvailability() {
    $('#cmCheckAvailability, #cmCheckAvailabilitySmallDevice, .book-stay-btn ').off('click').on('click', function(e) {
        e.stopPropagation();
        dataCache.session.setData("sameDayCheckout", $('.mr-hotel-details').attr('data-samedaycheckout'));
        isAmaCheckAvailability = false;
        $('.cm-page-container').addClass("prevent-page-scroll");
        $('.cm-bas-con').addClass('active');
        $(".cm-bas-content-con").css("max-height", 0.95 * (window.innerHeight));
        autoPopulateBookAStayWidget();
        initiateCalender();
        modifyBookingState = dataCache.session.getData('modifyBookingState');
        if (modifyBookingState && modifyBookingState != 'modifyRoomType') {
            modifyBookingInBookAStay(modifyBookingState);
        }
        resetPromoCodeTab();
		if($("#hotelIdFromSearch").text() == ''){
				$('.searchbar-input').val("")
		}
    });

    var openBookAStay = getUrlParameter("openBookAStay")
    if (openBookAStay == "true") {
        $(".book-stay-btn").click();
    }

};

function getUrlParameter(sParam) {
    var sPageURL = window.location.search.substring(1), sURLVariables = sPageURL.split('&'), sParameterName, i;

    for (i = 0; i < sURLVariables.length; i++) {
        sParameterName = sURLVariables[i].split('=');

        if (sParameterName[0] === sParam) {
            return sParameterName[1] === undefined ? true : decodeURIComponent(sParameterName[1]);
        }
    }
};

function promptToSelectDate() {
    var bookingOptions = dataCache.session.getData("bookingOptions");
    var elDatePrompt = $(".mr-checkIn-checkOut-Date .mr-checkIn-checkOut-Date-hover");
    if (!bookingOptions.isAvailabilityChecked) {
        elDatePrompt.css('display', 'block');
        elDatePrompt.addClass('cm-scale-animation');
    } else {
        elDatePrompt.css('display', 'none');
        elDatePrompt.removeClass('cm-scale-animation');
    }
}

function initializeDatePicker() {
    _globalPromoCode = {
        name : null,
        value : null
    };

     $('.bas-overlay').on('click', function(e) {
        e.stopPropagation();
       // destroyDatepicker(); 
        overlayDestroyDatepicker();
    });

    // pop up close
    $(".bas-close").click(function(e) {
        e.stopPropagation();
        destroyDatepicker();
    });

    $(".trigger-promo-code-input").on("click", function() {
        $(".promo-code-wrap").css("display", "block");
        $(this).parent().hide();
    });

    $(".close-promocode-section").on("click", function() {
        $(".promo-code-wrap").hide();
        $(".bas-have-promo-code").show();
    });

    $('.special-code-wrap .bas-aroow-btn').on('click', function() {
        $('.bas-code-wrap.clearfix').toggleClass('active');
        $(this).toggleClass('arrow-btn');
    });

    $(".input-daterange input").each(function(e) {
        $(this).focus(function(e) {
            $('.bas-calander-container').addClass('active');
            $(".bas-left-date-wrap").removeClass("active");
            $(".bas-right-date-wrap").removeClass("active");
            $(this).parent().parent().addClass("active");
        });
    });

    // adding quantity script starts
    $(".bas-room-details-container").delegate(".quantity-right-plus", "click", incrementSelectionCount);
    // adding quantity script ends

    // subtracting quantity script starts
    $(".bas-room-details-container").delegate(".quantity-left-minus", "click", decrementSelectionCount);
    // subtracting quantity script ends

    // SCRIPT for addroom button starts

    $(".bas-add-room").on('click', function() {
        addRoomModule();
        if (isIHCLCBHomePage()) {
            createguestCountContainer();
            // activate last room
            $('.bas-room-no').last().click();
        }
    });

    // SCRIPT for addroom button ends

    // adding active class when click on room no starts
    $(".bas-room-details-container").on("click", ".bas-room-no", function() {
        makeRoomActiveModule($(this));
    });
    // adding active class when click on room no ends

    // delete button script starts
    $(".bas-room-details-container").on("click", ".bas-room-delete-close", function(e) {
        e.stopPropagation();
        if ($(".bas-room-details").length > 1) {
            var roomDeleteIndex = $(this).closest('.bas-room-no').index('.bas-room-no');
            deleteRoomModule(roomDeleteIndex);
        }
    });

    // script by arvind ends
    $('.input-daterange input').blur(function(e) {
        $('.bas-hotel-details-container').removeClass('active');
    });

    $("#input-box1 , #input-box2").on('change', function(e) {
        updateFinalDatePlanModule();
        amaBookingObject.isAmaCheckAvailabilitySelected = true;
    });

    $('.active #input-box1').on('change', function(e) {
        var $nextInput = $('.input-box.date-explore').not($(this));
        var compareVal = $nextInput.val();

        var $self = $(this);
        var currVal = $(this).val();

        var bookingOptionsSelected = dataCache.session.getData("bookingOptions");
        var fromDateSelecetd = moment(bookingOptionsSelected.fromDate, "MMM Do YY").format("D MMM YY");

        if (currVal == fromDateSelecetd) {
            return;
        }

        setTimeout(function() {
            $(this).blur();
            $('.bas-calander-container').children().remove();
            $('#input-box2').focus();

            //var nextDate = moment(currVal, "D MMM YY").add(1, 'days');
			var nextDate = checkSameDayCheckout(currVal);

            if (isTajHolidays || getQueryParameter('holidaysOffer')) {
                var holidaysNights = 2;
                var holidaysCacheData = dataCache.session.getData('bookingOptions');
                if (holidaysCacheData && holidaysCacheData.nights)
                    holidaysNights = holidaysCacheData.nights;
                nextDate = moment(currVal, "D MMM YY").add(holidaysNights, 'days');
            }

            $nextInput.focus();
            $nextInput.datepicker('setDate', new Date(nextDate.toDate()));
            isToDateClickedTriggered = true;

            var $dateTable = $(".datepicker .datepicker-days table");
            updateFinalDatePlanModule();
			var shouldInvokeCalendarApi = document.getElementById("shouldInvokeCalendarApiBas").value;
			if(shouldInvokeCalendarApi){
                //***Removing Ama Calendar rates modified****//
                var getPathName = window.location.pathname;
                var getHostName = window.location.hostname;
                if(getHostName == 'www.amastaysandtrails.com' || getPathName.includes('/content/ama')){
                    return;
                } ///*** changes end ****///
				amacacalendarPricingBas();
				bindNextPrevClickAmaBas();
				$('#input-box2').trigger('click');						
			}

        }, 100);

    });

    $('#input-box2').on('change', function(e) {
        var $self = $(this);
        var isTargetInput = $self.closest('.bas-right-date-wrap').hasClass('active');
        var $nextInput = $('.input-box.date-explore').not($self);
        var compareVal = $nextInput.val();
        var currVal = $self.val();

        var bookingOptionsSelected = dataCache.session.getData("bookingOptions");
        var toDateSelecetd = moment(bookingOptionsSelected.toDate, "MMM Do YY").format("D MMM YY");

        if (isTargetInput) {

            setTimeout(function() {
                if (!isToDateClickedTriggered) {
                   hideCalenderInBookAStayPopup()
                    $self.parent().parent().removeClass("active");
                } else {
                    isToDateClickedTriggered = false;
                }

                $self.blur();

                if ((compareVal == currVal) && (compareVal != "") && (currVal != "")) {

                    //var nextDate = moment(currVal, "D MMM YY").add(1, 'days');
					var nextDate = checkSameDayCheckout(currVal);

                    if (isTajHolidays || getQueryParameter('holidaysOffer')) {
                        var holidaysNights = 2;
                        var holidaysCacheData = dataCache.session.getData('bookingOptions');
                        if (holidaysCacheData && holidaysCacheData.nights)
                            holidaysNights = holidaysCacheData.nights;
                        nextDate = moment(currVal, "D MMM YY").add(holidaysNights, 'days');
                    }

                    $self.datepicker('setDate', new Date(nextDate.toDate()));

                    var $dateTable = $(".datepicker .datepicker-days table");
                }
				
				
            }, 100);

            updateFinalDatePlanModule();

        }
    });

    // Click on Best available rate to proceed further
    $('.best-avail-rate').on('click', function(e) {
        var noOfNight = numberOfNightsCheck();
        var sebNights = sebNightsCheck();
        if (noOfNight == false) {
            numberOfNightsExcessWarning();
        }else if(sebNights == false){
            numberOfSebNightsExcessWarning();
        } else
            onClickOnCheckAvailabilty();
    });

    // removing links from search suggestion within booking widget
    $('.cm-bas-content-con').find('.suggestions-wrap').find('a').each(function() {
        $(this).removeAttr('href');
    });

    $('.promo-code').on("keyup", function() {
        var promoCodeInput = $(this).val();
        if (promoCodeInput.length > 0) {
            $('.apply-promo-code-btn').show();
            $('.promo-code-clear-input').show();
        } else {
            $('.apply-promo-code-btn').hide();
            $('.promo-code-clear-input').hide();
        }
    });

    $('.apply-promo-code-btn').on("click", function() {
        validatePromocode(_globalPromoCode);
    });

    $('.promo-code-clear-input').on("click", function() {
        $('.promo-code').val("");
        $(this).hide();
        $('.apply-promo-code-btn').hide();
        $('.promocode-status-text').text("");
        _globalPromoCode.value = null;
        _globalPromoCode.name = null;
    });

    $(".cm-bas-content-con .searchbar-input").keyup(function() {
        disableBestAvailableButton();

        $(this).attr("data-selected-search-value", "");
    });

    // Event listeners ends here
}

function numberOfNightsExcessWarning() {
    var popupParams = {
        title : 'Are you sure? You have selected more than 1O night.',
        callBack : onClickOnCheckAvailabilty.bind(),
        // callBackSecondary: secondaryFn.bind( _self ),
        needsCta : true,
        isWarning : true
    }
    warningBox(popupParams);
}
function numberOfSebNightsExcessWarning() {
    var popupParams = {
        title : 'Your maximum nights limit is exceeded.',
        callBack : modifySebNights,
        // callBackSecondary: secondaryFn.bind( _self ),
        needsCta : true,
        isWarning : true
    }
    warningBox(popupParams);
}
function modifySebNights(){
    $('.book-stay-btn').trigger('click');   
}

function navigateToRoomsPage(validationResult, clearExistingCart) {
    if (validationResult) {
        var nextPageHref;
        if (isAmaCheckAvailability) {
            nextPageHref = $('#checkAvailability').attr('hrefvalue');
        } else {
            nextPageHref = $('#global-re-direct').attr('hrefValue');
        }

        var bookingOptions = dataCache.session.getData("bookingOptions");
        if (clearExistingCart) {
            $(bookingOptions.roomOptions).each(function(index) {
                delete bookingOptions.roomOptions[index].userSelection;
            });
            bookingOptions.selection = [];
            $('.book-ind-container').css('display', 'none');
            $('.room-details-wrap, .bic-rooms').html('');
        }
        bookingOptions.isAvailabilityChecked = true;
        if (bookingOptions.rooms == 0) {
            bookingOptions.rooms = 1;
        }
        bookingOptions.previousRooms = bookingOptions.roomOptions;
        var BungalowType = bookingOptions.BungalowType
        if (!BungalowType) {
            BungalowType = null;
        }
        bookingOptions.previousDates = {
            fromDate : bookingOptions.fromDate,
            toDate : bookingOptions.toDate,
            BungalowType : BungalowType
        };
        dataCache.session.setData("bookingOptions", bookingOptions);
        var offerCodeIfAny = null;
        var onlyMemberRatesIfAny = null;
        var offerTitleIfAny = false;
        var holidaysOfferQueryParam = false;
        // [TIC-FLOW]
        //if (!isTicBased()) {
            //offerCodeIfAny = $('[data-offer-rate-code]').data('offer-rate-code');
			offerCodeIfAny = $('[data-offer-rate-code]:not(.tic-room-redemption-rates)').data('offer-rate-code');
        	onlyMemberRatesIfAny = getQueryParameter('onlyMemberRates');
            // HolidayOfferTitle
            offerTitleIfAny = getQueryParameter('offerTitle');
            holidaysOfferQueryParam = getQueryParameter('holidaysOffer');
        //}
        var usedVoucherCode = $('#usedVoucher').text();
        if (usedVoucherCode != undefined && usedVoucherCode != "" && usedVoucherCode != " ") {
            var bookingOptionsCache = dataCache.session.getData('bookingOptions');
            if (bookingOptionsCache.usedVoucherCode == usedVoucherCode) {
                offerCodeIfAny = "X5";
            }

        }
        if ($('#page-scope').attr('data-pagescope') == 'Taj Holidays')
            dataCache.session.setData("checkHolidayAvailability", true);
        else
            dataCache.session.setData("checkHolidayAvailability", false);

        if ($('.rate-code').val() || $('.promo-code').val() || $('.agency-id').val()) {
            var bookingSessionData = dataCache.session.getData("bookingOptions");
            var checkInDate = moment(bookingSessionData.fromDate, "MMM Do YY").format("YYYY-MM-DD");
            var checkOutDate = moment(bookingSessionData.toDate, "MMM Do YY").format("YYYY-MM-DD");

            var roomOptions = bookingSessionData.roomOptions;
            var roomOptionsLength = roomOptions.length;
            var adults, children;
            var searchHotelId = $("#hotelIdFromSearch").text();
            var rateCode = $('.rate-code').val();
            var agencyId = $('.agency-id').val();
            var promoAccessCode = $('.promo-code').val();
            for (var r = 0; r < roomOptionsLength; r++) {
                var adlt = roomOptions[r].adults;
                var chldrn = roomOptions[r].children;
                if (r == 0) {
                    adults = adlt;
                    children = chldrn;
                } else {
                    adults = adults + ',' + adlt;
                    children = children + ',' + chldrn;
                }
            }
         if(!!agencyId){
            var synxisRedirectLink = 'https://be.synxis.com/?' + 'arrive=' + checkInDate + '&depart=' + checkOutDate
            + '&rooms=' + roomOptionsLength + '&adult=' + adults + '&child=' + children + '&hotel='
            + searchHotelId + '&chain=21305' + '&currency=' + '&level=chain' + '&locale=en-US' + '&sbe_ri=0';
            	synxisRedirectLink = synxisRedirectLink + (!!agencyId ? '&agencyid=' + agencyId : '')
            + (!!rateCode ? '&&rate=' + rateCode : '') + (!!promoAccessCode ? '&promo=' + promoAccessCode : '');
            	nextPageHref = synxisRedirectLink;
            }else{
            	nextPageHref = nextPageHref + "?" +(!!rateCode ? '&&offerRateCode=' + rateCode : '') + (!!promoAccessCode ? '&promoCode=' + promoAccessCode : '');

                /*Check if GInger hotels*/
                if(searchHotelId == "99999"){
                    nextPageHref = nextPageHref + "&from=" + checkInDate + "&to=" + checkOutDate + "&rooms=" + roomOptionsLength + 
                        			"&adults=" + adults + "&children=" + children;
                    var tataNeuParams = localStorage.getItem("tataNeuParams");
                    if(tataNeuParams != null){
                    	nextPageHref = nextPageHref + "&" + tataNeuParams;
                	}

                    /* commenting old code 
                    var authCode = localStorage.getItem("authCode");
                    if(authCode != null){
                    	nextPageHref = nextPageHref + "&authCode=" + authCode;
                	}
                    var codeVerifier = localStorage.getItem("codeVerifier");
                    if(codeVerifier != null){
                    	nextPageHref = nextPageHref + "&codeVerifier=" + codeVerifier;
                	}
                    */
                }
			}
        }
        if (isAmaSite) {
            var offerRateCode = $('[data-offer-rate-code]:not(.tic-room-redemption-rates)').data('offer-rate-code');
			var publicRateshide = (getQueryParameter('publicRates')? '&publicRates='+getQueryParameter('publicRates') : '');
            if (offerRateCode) {
                nextPageHref = nextPageHref.concat('?offerRateCode=' + offerRateCode + '&checkAvail=true' + publicRateshide);
            } else if (promoAccessCode == null || promoAccessCode == '') {
                nextPageHref = nextPageHref.concat('?checkAvail=true');
            } else {
                nextPageHref = nextPageHref.concat('&checkAvail=true');
            }
            if(nextPageHref.indexOf("?") != -1) 
				nextPageHref = nextPageHref + checkandAppendOtherQueryParams();
            else
                nextPageHref = nextPageHref + "?" + checkandAppendOtherQueryParams();

            if (isAmaCheckAvailability) {
                if (isBungalowSelected()) {
                    nextPageHref += "&onlyBungalows=true";
                }
            } else {
                if ($('#onlyBungalowBtn').is(':checked')) {
                    nextPageHref += "&onlyBungalows=true";
                }
            }

        } else {
            debugger;
            var promoTabParamIfAny = getQueryParameter('promoCode');
            var rataTabParamIfAny = getQueryParameter('rateTab');
			var publicRateshide = getQueryParameter('publicRates');
            var promoCodeEnabled = $('#promoCode').val();
            if(promoCodeEnabled == 'true'){
                var pageParam = (!!offerCodeIfAny ? 'promoCode=' + offerCodeIfAny : '')
                        + (offerTitleIfAny ? '&offerTitle=' + offerTitleIfAny : '')
                        + (holidaysOfferQueryParam ? '&holidaysOffer=' + holidaysOfferQueryParam : '')
                        + (promoTabParamIfAny ? '&promoCode=' + promoTabParamIfAny : '')
                        + (rataTabParamIfAny ? '&rateTab=' + rataTabParamIfAny : '')
                        + (publicRateshide ? '&publicRates=' + publicRateshide : '');
                }
            else{
					var pageParam = (!!offerCodeIfAny ? 'offerRateCode=' + offerCodeIfAny : '')
                    		+ (onlyMemberRatesIfAny ? '&onlyMemberRates=' + onlyMemberRatesIfAny : '')
                            + (offerTitleIfAny ? '&offerTitle=' + offerTitleIfAny : '')
                            + (holidaysOfferQueryParam ? '&holidaysOffer=' + holidaysOfferQueryParam : '')
                            + (promoTabParamIfAny ? '&promoCode=' + promoTabParamIfAny : '')
                            + (rataTabParamIfAny ? '&rateTab=' + rataTabParamIfAny : '')
                            + (publicRateshide ? '&publicRates=' + publicRateshide : '');
            	}

            if (pageParam) {
                nextPageHref = nextPageHref + "?" + pageParam;
            }

            if(nextPageHref.indexOf("?") != -1) 
				nextPageHref = nextPageHref + checkandAppendOtherQueryParams();
            else
                nextPageHref = nextPageHref + "?" + checkandAppendOtherQueryParams();

        }
        if (nextPageHref.includes('amastaysandtrails.com')) {
            nextPageHref = nextPageHref.replace('rooms-and-suites', 'accommodations');
        }

        /*fixe for Microsite navigation in prod*/
		if(nextPageHref.includes('https://www.tajinnercircle.com')) {
			 nextPageHref = nextPageHref.replace('https://www.tajinnercircle.com/en-in', '/en-in/tajinnercircle');
		}
		if(nextPageHref.includes('https:/www.tajinnercircle.com')) {
			nextPageHref = nextPageHref.replace('https:/www.tajinnercircle.com/en-in', '/en-in/tajinnercircle');
		}

        if (domainChangeFlag) {
            if (nextPageHref.includes("?")) {
                if (nextPageHref.charAt(nextPageHref.length - 1) === "?") {
                    nextPageHref += fetchDateOccupancyAsQueryString();
                } else {
                    nextPageHref += "&" + fetchDateOccupancyAsQueryString();
                }
            } else {
                nextPageHref += "?" + fetchDateOccupancyAsQueryString();
            }
        }

		// handle page refresh for voucher redemption
		var voucherRedemption = dataCache.session.getData('voucherRedemption');
        var voucherShowRates = dataCache.session.getData('voucherRedemptionShowPrice');
		if(voucherRedemption && voucherRedemption == 'true'){
			nextPageHref = nextPageHref + "&voucherRedemption=true";
            if(voucherShowRates){
			nextPageHref = nextPageHref + "&voucherRedemption=true" + "&voucherPrice=true"
			}
		}

		if(modifyBookingState && modifyBookingState != ''){
			nextPageHref = window.location.href.split('?')[0];		
		}

		if(nextPageHref.includes('/ginger/')) {

			var bookingSessionData = dataCache.session.getData("bookingOptions");
            var checkInDate = moment(bookingSessionData.fromDate, "MMM Do YY").format("YYYY-MM-DD");
            var checkOutDate = moment(bookingSessionData.toDate, "MMM Do YY").format("YYYY-MM-DD");

            var roomOptions = bookingSessionData.roomOptions;
            var roomOptionsLength = roomOptions.length;
            var adults, children;
            var searchHotelId = $("#hotelIdFromSearch").text();
            var rateCode = $('.rate-code').val();
            var agencyId = $('.agency-id').val();
            var promoAccessCode = $('.promo-code').val();
            for (var r = 0; r < roomOptionsLength; r++) {
                var adlt = roomOptions[r].adults;
                var chldrn = roomOptions[r].children;
                if (r == 0) {
                    adults = adlt;
                    children = chldrn;
                } else {
                    adults = adults + ',' + adlt;
                    children = children + ',' + chldrn;
                }
            }

            if(getParamFromURL("from", nextPageHref) == null || getParamFromURL("to", nextPageHref) == null
             || getParamFromURL("rooms", nextPageHref) == null || getParamFromURL("adults", nextPageHref) == null 
             || getParamFromURL("children", nextPageHref) == null) {

                if(getParamFromURL("from", nextPageHref) == null)
                     nextPageHref = nextPageHref + "&from=" + checkInDate;

                if(getParamFromURL("to", nextPageHref) == null)
                     nextPageHref = nextPageHref + "&to=" + checkOutDate;

                if(getParamFromURL("rooms", nextPageHref) == null)
                     nextPageHref = nextPageHref + "&rooms=" + roomOptionsLength;

                if(getParamFromURL("adults", nextPageHref) == null)
                     nextPageHref = nextPageHref + "&adults=" + adults;

                if(getParamFromURL("children", nextPageHref) == null)
                     nextPageHref = nextPageHref + "&children=" + children;

                if(getParamFromURL("promoCode", nextPageHref) == null) 
                     nextPageHref = nextPageHref + "&promoCode=" + promoAccessCode;

                if(localStorage.getItem('tataNeuParams') != null){
                    nextPageHref = nextPageHref + "&" + localStorage.getItem('tataNeuParams');
                }
                 /*var authCode = localStorage.getItem("authCode");
                 if(authCode != null){
                     nextPageHref = nextPageHref + "&authCode=" + authCode;
                 }
                 var codeVerifier = localStorage.getItem("codeVerifier");
                 if(codeVerifier != null){
                     nextPageHref = nextPageHref + "&codeVerifier=" + codeVerifier;
                 }*/
            }
		}

        if(nextPageHref.indexOf('/ginger/') != -1 && nextPageHref.indexOf("/en-in/swt/?redirectUrl=") == -1) {
            nextPageHref = "/en-in/swt/?redirectUrl=" + nextPageHref;
        }

        window.location.href = nextPageHref;

        $(".cm-bas-con").removeClass("active");
    }
    $('#book-a-stay').trigger('taj:fetchRates', [ bookingOptions ]);
};

function getParamFromURL(name, customUrl) {
    var match = RegExp('[?&]' + name + '=([^&]*)').exec(customUrl);
    return match && decodeURIComponent(match[1].replace(/\+/g, ' '));
}

function checkandAppendOtherQueryParams(){
	var queryString = ''
	queryString += (getQueryParameter('gsoCorporateBooking')? '&gsoCorporateBooking='+getQueryParameter('gsoCorporateBooking') : '');
	queryString += (getQueryParameter('vouchershareholderflow')? '&vouchershareholderflow='+getQueryParameter('vouchershareholderflow') : '');
	queryString += (getQueryParameter('rateTab')? '&rateTab='+getQueryParameter('rateTab') : '');
	queryString += (getQueryParameter('qcvoucherCode')? '&qcvoucherCode='+getQueryParameter('qcvoucherCode') : '');
	queryString += (getQueryParameter('qcvoucherpin')? '&qcvoucherpin='+getQueryParameter('qcvoucherpin') : '');
	//queryString += (sessionStorage.getItem('source') != null? '&&source='+sessionStorage.getItem('source') : '');
    // new changes
    queryString += (getQueryParameter('source') != null? '&source='+getQueryParameter('source') : '');
    queryString += (getQueryParameter('utm_source') != null? '&utm_source='+getQueryParameter('utm_source') : '');
    queryString += (getQueryParameter('utm_medium') != null? '&utm_medium='+getQueryParameter('utm_medium') : '');
    queryString += (getQueryParameter('pincode') != null? '&pincode='+getQueryParameter('pincode') : '');
    queryString += (getQueryParameter('city') != null? '&city='+getQueryParameter('city') : '');
    queryString += (getQueryParameter('lat') != null? '&lat='+getQueryParameter('lat') : '');
    queryString += (getQueryParameter('long') != null? '&long='+getQueryParameter('long') : '');

	return queryString;
}

function onClickOnCheckAvailabilty() {
    var validationResult = validateSearchInput();

    if (isIHCLCBHomePage() && !(checkboxCheckedStatus() && isEntitySelected())) {
        return;
    }

    var bookingOptions = updateBookingOptionsInStorage(_globalPromoCode);

    var getHotelId;
    getHotelId = $("#hotelIdFromSearch").text();
    var dataId = dataCheck();
    checkPreviousSelection();
    var cartCheck = cartEmptyCheck();
    var check = false;
    if (getHotelId != dataId) {
        check = true;
    }
    var _self = this;
    if (modifyBookingState == 'modifyDate') {
        var modifiedCheckInDate = moment($('#input-box1').datepicker('getDate')).format("MMM Do YY");
        var modifiedCheckOutDate = moment($('#input-box2').datepicker('getDate')).format("MMM Do YY");
        if (modifiedCheckInDate != bookedCheckInDate || modifiedCheckInDate != bookedCheckOutDate) {
            var warnMsg = 'You have changed Check-In/Check-Out date. Are you sure you want to continue?';
            showWarningMessage(_self, warnMsg, validationResult);
        } else {
            $('.bas-close').trigger('click');
            // or we will redirect to confirmation page with previous
            // booking details
        }
    } else if (modifyBookingState == 'modifyRoomOccupancy') {
        var modifiedAdultsOccupancy = $('.bas-no-of-adults input').val();
        var modifiedChildrenOccupancy = $('.bas-no-of-child input').val();
        if (modifiedAdultsOccupancy != bookedAdultsOccupancy || modifiedChildrenOccupancy != bookedChildrenOccupancy) {
            var warnMsg = 'You have changed Adult/Child occupancy. Are you sure you want to continue?';
            showWarningMessage(_self, warnMsg, validationResult);
        } else {
            $('.bas-close').trigger('click');
            // or we will redirect to confirmation page with previous
            // booking details
        }
    } else if (modifyBookingState == 'modifyAddRoom') {
        var clearExistingCart = true;
        var warnMsg = 'You have added room. Are you sure you want to continue?';
        showWarningMessage(_self, warnMsg, validationResult);
    } else if (!cartCheck && (check || availabilityObj.isCheckParamsUpdated || availabilityObj.isDatesUpdated)) {
        var clearExistingCart = true;
        var warnMsg = 'Your existing cart values, if any, will be lost because you have updated your selection. Do you want to proceed?';
        showWarningMessage(_self, warnMsg, validationResult);
    } else if (isAmaSite && availabilityObj.isRoomTypeUpdated) {
        var warnMsg = 'You have updated your room type. Do you want to proceed?';
        showWarningMessage(_self, warnMsg, validationResult);
    } else {
        navigateToRoomsPage(validationResult);
    }
}

function showWarningMessage(_self, msg, validationResult) {
    var popupParams = {
        title : msg,
        callBack : navigateToRoomsPage.bind(_self, validationResult, true),
        // callBackSecondary: secondaryFn.bind( _self ),
        needsCta : true,
        isWarning : true
    }
    warningBox(popupParams);
}

function updateRoomNumberText() {
    var room = "Room";
    if ($(".bas-room-details").length > 1)
        room = "Rooms";
    else
        room = "Room";
    $(".room-border").text($(".bas-room-details").length + " " + room);
}

function dataCheck() {
    var cartHotelId;
    var bookingData = dataCache.session.getData("bookingOptions");
    if (bookingData && bookingData.selection && (bookingData.selection.length > 0)) {
        cartHotelId = bookingData.selection[0].hotelId;
    }
    return cartHotelId;
}

// _globalListOfPromoCode=['PROMO1','PROMOX'];
function validatePromocode(_globalPromoCode) {
    var promoCodeInput = $('.promo-code').val();
    promoCodeInput = promoCodeInput.toUpperCase();
    var promoCodeStatus = true;
    if (promoCodeStatus) {
        $('.promocode-status-text').text("Promo code selected: " + promoCodeInput);
        _globalPromoCode.value = promoCodeInput;
        _globalPromoCode.name = promoCodeInput;
    } else {
        $('.promocode-status-text').text("Promo code invalid.");
        _globalPromoCode.value = null;
        _globalPromoCode.name = null;
    }
}

function cartEmptyCheck() {
    var dataa = dataCache.session.getData("bookingOptions");
    if (dataa.selection && (dataa.selection.length == 0)) {
        return true;
    } else {
        return false;
    }
}

function incrementSelectionCount(e) {
    // Stop acting like a button
    e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
    amaBookingObject.isAmaCheckAvailabilitySelected = true;
    // Get the field name
    var $button = $(this);
    var quantity = parseInt($button.parent().parent().find("input").val());
    ++quantity;
    if (isAmaSite) {
        if ($(".ama-theme .bas-about-room-container").css("display") == "block") {
            if ($button.hasClass('quantity-right-plus1')){
                if (quantity > 10) {
                    quantity = 10;
                }

                }
            else{
					if (quantity > 7) {
                    quantity = 7;
                }
            }

        } else {
            if ($button.hasClass('quantity-right-plus1')) {
                if (quantity > 16) {
                    quantity = 16;
                }
            } else {
                if (quantity > 8) {
                    quantity = 8;
                }
            }
        }
    } else {
        if (quantity > 7) {
            quantity = 7;
        }
    }
    $button.parent().parent().find("input").val(quantity);
    $button.parent().parent().find("input").text(quantity);
    var x = $button.parent().parent().parent().attr("class");
    // script for adult count starts
    updateTotalAdultsCountModule();
    // script for adult count ends
	return false;
};

function decrementSelectionCount(e) {
    // Stop acting like a button
    amaBookingObject.isAmaCheckAvailabilitySelected = true;
    e.preventDefault();
	e.stopPropagation();
	e.stopImmediatePropagation();
    // Get the field name
    var $button = $($(this)[0])
    var quantity = parseInt($button.parent().parent().find("input").val());
    var x = $button.parent().parent().parent().attr("class");
    if (quantity > 0) {
        if (x === "bas-no-of-adults" && quantity == 1) {
            quantity = 2;
        }
        $button.parent().parent().find("input").val(quantity - 1);
    }
    // script for adult count starts
    updateTotalAdultsCountModule();
    // script for adult count ends
};

// module to update total adults count in booking widget
function updateTotalAdultsCountModule() {
    var totalAdultsCount = 0;
    $('.bas-no-of-adults, .bas-no-of-child').find('input').each(function() {
        totalAdultsCount += parseInt($(this).val());
    });
    var guestSuffix = (totalAdultsCount > 1) ? 's' : '';
    $(".bas-count-of-adults").text(totalAdultsCount + " Guest" + guestSuffix);
}

function checkPreviousSelection() {
    var bookingOptions = dataCache.session.getData("bookingOptions");
    if (bookingOptions.isAvailabilityChecked) {
        bookingOptions.previousRooms
                .forEach(function(value, index) {
                    if (bookingOptions.roomOptions[index]
                            && ((value.adults != bookingOptions.roomOptions[index].adults) || (value.children != bookingOptions.roomOptions[index].children))) {
                        availabilityObj.isCheckParamsUpdated = true;
                    }
                });

        if ((bookingOptions.fromDate != bookingOptions.previousDates.fromDate)
                || (bookingOptions.toDate != bookingOptions.previousDates.toDate)) {
            availabilityObj.isDatesUpdated = true;
        }
        if (isAmaSite && bookingOptions.BungalowType && bookingOptions.previousDates
                && bookingOptions.previousDates.BungalowType
                && bookingOptions.previousDates.BungalowType != bookingOptions.BungalowType) {
            availabilityObj.isRoomTypeUpdated = true;
        }

    }
}

// module to add room
function addRoomModule() {

    var room_no = $(".bas-room-no").length + 1;
    if (room_no < 6) {
        $(".bas-add-room")
                .before(
                        '<li class="bas-room-no" id=room'
                                + room_no
                                + '><button class="btn-only-focus" aria-label = "bas room"><span class="bas-room bas-desktop">Room &nbsp</span><span class="bas-span-room-no">'
                                + room_no
                                + '</span></button><div class="bas-room-delete-close"><i class="icon-close"><button class="btn-only-focus" aria-label = "close icon"></button></i></div></li>');

        $($(".bas-room-details")[0]).clone().appendTo(".bas-room-details-container").addClass("bas-hide");

        var x = room_no;
        room_no--;
        $($(".bas-room-details")[room_no]).attr("id", "room" + x + "Details");
        $($(".bas-room-details")[room_no]).find("input").val("1");
        $($($(".bas-room-details")[room_no]).find("input")[1]).val("0");
        updateTotalAdultsCountModule();

        // update text for number of rooms
        updateRoomNumberText();
        var elRoomNumber = $(".bas-about-room-container").find('.bas-room-no');
        if (elRoomNumber.length >= 5) {
            $(".bas-add-room").addClass("bas-hide");
        } else {
            $(".bas-add-room").removeClass("bas-hide");
        }
        // script to make newly added room active

        makeRoomActiveModule($('.bas-room-no').last());
        $('.bas-room-delete-close .icon-close').removeClass('cm-hide');
    }
};

function isIHCLCBHomePage() {
    var currentPage = window.location.pathname;
    return currentPage.includes('/dashboard');
}

function deleteRoomInCartAndUpdateSelectionData(deleteRoomNumber) {
    var deleteRoomIndex = deleteRoomNumber - 1;
    $($('.fc-add-package-con')[deleteRoomIndex]).find('.selection-delete').trigger('click');
    var bookingOptionsInStorage = dataCache.session.getData("bookingOptions");
    var roomOptionsModified = bookingOptionsInStorage.roomOptions;
    roomOptionsModified.splice(deleteRoomIndex, 1);
    bookingOptionsInStorage.roomOptions = roomOptionsModified;
    --bookingOptionsInStorage.rooms;
    dataCache.session.setData("bookingOptions", bookingOptionsInStorage);
    updateCheckAvailability();
    $(".fc-add-package-con").eq(deleteRoomIndex).remove();
    updateRoomIndexForSelectedPackages();
    setCartPanelRoomsConWidth();
    updateSelectionInstruction();
}

function updateRoomIndexForSelectedPackages() {
    var bookingOptionsInStorage = dataCache.session.getData("bookingOptions");
    bookingOptionsInStorage.selection.forEach(function(value, index) {
        value.roomIndex = index;
    });
    dataCache.session.setData("bookingOptions", bookingOptionsInStorage);
}

// module to delete room
function deleteRoomModule(roomDeleteIndex) {
    $('.bas-room-no').eq(roomDeleteIndex).remove();
    $('.bas-room-details').eq(roomDeleteIndex).remove();
    var totalRoomsAfterDeletion = $('.bas-room-details').length;
    if (totalRoomsAfterDeletion < 2) {
        $('.bas-room-delete-close .icon-close').addClass('cm-hide');
    }
    var roomID = 1;
    $('.bas-room-no').each(function() {
        $(this).attr('id', 'room' + roomID);
        $(this).find('.bas-span-room-no').text(roomID);
        ++roomID;
    });
    roomID = 1;
    $('.bas-room-details').each(function() {
        $(this).attr('id', 'room' + roomID + "Details");
        ++roomID;
    });

    if ($('.bas-room-no').hasClass('bas-active') == false) {
        if ($('.bas-room-no').eq(roomDeleteIndex).length > 0) {
            makeRoomActiveModule($('.bas-room-no').eq(roomDeleteIndex));
        } else {
            makeRoomActiveModule($('.bas-room-no').eq(roomDeleteIndex - 1));
        }
    }
    deleteRoomInCartAndUpdateSelectionData(roomDeleteIndex + 1);

    // update for adults count starts
    updateTotalAdultsCountModule();
    // update for adults count ends
    // update text for number of rooms
    updateRoomNumberText();
    $(".bas-add-room").removeClass("bas-hide");
};

// module to make room active
function makeRoomActiveModule(elem) {
    $(".bas-room-no").each(function() {
        $(this).removeClass("bas-active");
    });

    var new_room_no = elem.attr("id") + "Details";

    $(".bas-room-details-container").find("ul").each(function() {
        $(this).addClass("bas-hide");
    });
    $($(".bas-room-details-container").find("ul")[0]).removeClass("bas-hide");
    $(".bas-room-details-container").find("ul#" + new_room_no).removeClass("bas-hide");

    elem.addClass("bas-active");
}

// module to update final date plan
function updateFinalDatePlanModule() {

    var currentDate = moment($("#input-box1").datepicker("getDate")).format("D MMM YY");
    var nextDate = moment($("#input-box2").datepicker("getDate")).format("D MMM YY");
    var finalDatePlan = currentDate + " - " + nextDate;

    $(".final-date-plan").text(finalDatePlan);
};

// module to update booking storage data
function updateBookingOptionsInStorage(_globalPromoCode) {
    var bookingOptions = dataCache.session.getData("bookingOptions") || getInitialBookAStaySessionObject();
    bookingOptions.promoCode = _globalPromoCode.value;
    bookingOptions.promoCodeName = _globalPromoCode.name;
    var currentDate;
    var nextDate;
    var totalRoomsOpted;
    var targetEntity;
    if (isAmaCheckAvailability) {
        var roomsSelector = $('.guests-dropdown-wrap .guest-room-header');
        currentDate = parseDate($("#input-box-from").val());
        nextDate = parseDate($("#input-box-to").val());
        totalRoomsOpted = roomsSelector.length;
        targetEntity = $('.check-avblty-wrap .select-dest-placeholder').text();
        bookingOptions = fetchRoomOptionsSelected(bookingOptions);
        if (isBungalowSelected()) {
            bookingOptions["BungalowType"] = "onlyBungalow";
        } else {
            bookingOptions["BungalowType"] = "IndividualRoom";
        }
    } else {
        currentDate = parseSelectedDate($("#input-box1").datepicker("getDate"));
        nextDate = parseSelectedDate($("#input-box2").datepicker("getDate"));
        if (isIHCLCBSite()) {
            totalRoomsOpted = $('.ihclcb-bas-room-no').length;
        } else {
            totalRoomsOpted = $('.bas-room-no').length;
        }
        targetEntity = $('.searchbar-input').val();
        bookingOptions = fetchRoomOptionsSelected(bookingOptions);
        if (isAmaSite) {
            bookingOptions["BungalowType"] = fetchRadioButtonSelectedAma();
            targetEntity = $('#booking-search .dropdown-input').text();
        }
    }
    if (isAmaSite && bookingOptions.BungalowType && bookingOptions.previousDates
            && bookingOptions.previousDates.BungalowType
            && bookingOptions.BungalowType != bookingOptions.previousDates.BungalowType) {
        bookingOptions.selection = [];
    }
    bookingOptions.fromDate = currentDate;
    bookingOptions.toDate = nextDate;
    bookingOptions.rooms = totalRoomsOpted;
    bookingOptions.targetEntity = targetEntity;
    bookingOptions.nights = moment(nextDate, "MMM Do YY").diff(moment(currentDate, "MMM Do YY"), 'days');
    updateHotelChainCodeAndHoteID(bookingOptions);
    dataCache.session.setData("bookingOptions", bookingOptions);

    // Updates the check availability component's data
    updateCheckAvailability();

    updateFinalDatePlanModule();

    // Update the floating cart values on updation of inputs from BAS widget
    var elFloatingCart = $('.book-ind-container');

    return bookingOptions;
};

function fetchRadioButtonSelectedAma() {
    if ($('.book-stay-popup-radio-btn #onlyBungalowBtn').is(':checked')) {
        return "onlyBungalow";
    }
    return "IndividualRoom";
}

function fetchRoomOptionsSelected(bookingOptions) {
    console.log('Booking Room options '+bookingOptions.roomOptions);
    var selectedRoomOption = bookingOptions.roomOptions ? extractObjectValues(bookingOptions.roomOptions) : [];
    bookingOptions.roomOptions = [];
    var userSelectionList = [];
    $(selectedRoomOption).each(function() {
        userSelectionList.push(this.userSelection);
    });
    if (isAmaSite && isAmaCheckAvailability) {
        return updateRoomOptionsBookAStayAma(bookingOptions, userSelectionList);
    } else {
        return updateRoomOptionsBookAStay(bookingOptions, userSelectionList);
    }


}

function updateRoomOptionsBookAStayAma(bookingOptions, userSelectionList) {
    $('.guests-dropdown-wrap .guest-room-header').each(function(index) {
        var $this = $(this);
        var adultsCount = $this.find('.adult-wrap .counter').text();
        var childrenCount = $this.find('.children-wrap .counter').text();
        var selectedObject = {
            'adults' : adultsCount,
            'children' : childrenCount,
            'initialRoomIndex' : index,
            'userSelection' : userSelectionList[index]
        };
        bookingOptions.roomOptions.push(selectedObject);
        if (bookingOptions.selection && bookingOptions.selection.length > 0 && bookingOptions.selection[index]) {
            bookingOptions.selection[index].adults = adultsCount;
            bookingOptions.selection[index].children = childrenCount;
        }
    });
    return bookingOptions;
}

function updateRoomOptionsBookAStay(bookingOptions, userSelectionList) {
    var $roomDetailsCont = $('.bas-room-details');
    if (isIHCLCBHomePage()) {
        $roomDetailsCont = $('.ihclcb-bas-room-details');
    }
    $roomDetailsCont.each(function(index) {
        var selectedHeadCount = $(this).find('.bas-quantity');
        var adultsCount = selectedHeadCount[0].value;
        var childrenCount = selectedHeadCount[1].value;
        var selectedObject = {
            'adults' : adultsCount,
            'children' : childrenCount,
            'initialRoomIndex' : index,
            'userSelection' : userSelectionList[index]
        };
        bookingOptions.roomOptions.push(selectedObject);
        if (bookingOptions.selection && bookingOptions.selection.length > 0 && bookingOptions.selection[index]) {
            bookingOptions.selection[index].adults = adultsCount;
            bookingOptions.selection[index].children = childrenCount;
        }
    });
    return bookingOptions;
}

function isBungalowSelected() {
    return $('.check-avblty-container .radio-container #onlyBungalow').is(':checked');
}

// ie fall back for object.values
function extractObjectValues(objectName) {
    return (Object.keys(objectName).map(function(objKey) {
        return objectName[objKey]
    }))
}
// changing date to "MMM Do YY" format
function parseSelectedDate(selectedDateValue) {
    var formatedDate = moment(selectedDateValue, "D MMM YY").format("MMM Do YY");
    return formatedDate;
}

function getInitialRoomOption() {
    return [ {
        adults : 1,
        children : 0,
        initialRoomIndex : 0
    } ];
}

// return session Object for book a stay
function getInitialBookAStaySessionObject() {
    var toDateForBooking = initialBookingSetup();
    return {
        fromDate : moment(new Date()).add(1, 'days').format("MMM Do YY"),
        toDate : toDateForBooking,
        rooms : 1,
        nights : 1,
        roomOptions : getInitialRoomOption(),
        selection : [],
        promoCode : null,
        hotelChainCode : null,
        hotelId : null,
        isAvailabilityChecked : false
    };
}

// set book a stay session data
// function setBookAStaySessionObject() {
// var bookingOptionsSelected = dataCache.session.getData("bookingOptions") || getInitialBookAStaySessionObject();
// dataCache.session.setData("bookingOptions", bookingOptionsSelected);
// }

function removePopulatedRoomsBookAStay(_this) {
    _this.each(function(i, ele) {
        if (i > 0) {
            ele.remove();
        }
    });
}

function populateAmaRoomTypeRadioButton(bookingOptionsSelected) {
    var roomType = bookingOptionsSelected.roomType || bookingOptionsSelected.BungalowType;
    if (roomType && roomType == "onlyBungalow") {
        $('#book-a-stay .radio-button #onlyBungalowBtn').click();
    } else {
        $('#book-a-stay .radio-button #onlyRoomBtn').click();
    }
}

// auto updating booking widget with respect to storage data
function autoPopulateBookAStayWidget() {
    var bookingOptionsSelected;
    if (isAmaSite && amaBookingObject.isAmaCheckAvailabilitySelected) {
        bookingOptionsSelected = Object.assign({}, amaBookingObject);
        populateAmaRoomTypeRadioButton(bookingOptionsSelected);		
    } else {
        bookingOptionsSelected = dataCache.session.getData("bookingOptions") || getInitialBookAStaySessionObject();
        populateAmaRoomTypeRadioButton(bookingOptionsSelected);
        updateHotelChainCodeAndHoteID(bookingOptionsSelected);
        dataCache.session.setData("bookingOptions", bookingOptionsSelected);
    }

	
    // var fromDateSelecetd = moment(bookingOptionsSelected.fromDate, "MMM Do YY").format("D MMM YY");
    // var toDateSelecetd = moment(bookingOptionsSelected.toDate, "MMM Do YY").format("D MMM YY");

    // $('#input-box1').val(fromDateSelecetd);
    // $('#input-box2').val(toDateSelecetd);
	

    var roomOptionsSelected = bookingOptionsSelected.roomOptions;

    removePopulatedRoomsBookAStay($(".bas-room-no"));
    removePopulatedRoomsBookAStay($(".bas-room-details"));

    roomOptionsSelected.forEach(function(val, index) {
        if (index > 0) {
            addRoomModule();
        }

        var currentIndexRoom = $($('.bas-room-details')[index]);
        $(currentIndexRoom[0]).find('.bas-no-of-adults input').val(val.adults);
        $(currentIndexRoom[0]).find('.bas-child-no-container input').val(val.children);
    });

    if (bookingOptionsSelected.promoCode) {
        $('.promo-code').val(bookingOptionsSelected.promoCode);
        $('.promocode-status-text').text("Promo code selected: " + bookingOptionsSelected.promoCode);
    }

    if ($('.cm-page-container').hasClass('specific-hotels-page')
            || $('.cm-page-container').hasClass('destination-layout')) {
        var targetEntitySelected = $('.banner-titles .cm-header-label').text();
        $('.specific-hotels-page, .destination-layout').find('.cm-bas-content-con .searchbar-input').val(
                targetEntitySelected);
        var rootPath = fetchRootPath();
        if (rootPath) {
            rootUrl = rootPath;
            if ($.find("[data-hotel-id]")[0]) {
                $('#hotelIdFromSearch').text($($.find("[data-hotel-id]")[0]).data().hotelId);
            }
            enableBestAvailableButton(rootUrl);
        }
        $('.cm-bas-content-con .searchbar-input').attr("data-selected-search-value", targetEntitySelected);
    }

    // Updates the check availability component's data
    updateCheckAvailability();

    makeRoomActiveModule($('.bas-room-no').first());
    promptToSelectDate();

    updateTotalAdultsCountModule();
}

// destroy datepicker
function destroyDatepicker() {
    $('.bas-datepicker-container .input-daterange').datepicker('destroy');
    $(".cm-bas-con").removeClass("active");
    $('.cm-page-container').removeClass("prevent-page-scroll");
	if($('#book-a-stay').data('theme') == 'ama-theme'){
		$('.select-dest-placeholder').val('');
		$('#select-results')[0].classList.add("d-none");
	}
};

//overlay destroy datapicker
function overlayDestroyDatepicker() {
   // $('.bas-datepicker-container .input-daterange').datepicker('destroy');
    $(".cm-bas-con").removeClass("active");
    $('.cm-page-container').removeClass("prevent-page-scroll");
	if($('#book-a-stay').data('theme') == 'ama-theme'){
		$('.select-dest-placeholder').val('');
		$('#select-results')[0].classList.add("d-none");
	}
};

// inititalize calendar
function initiateCalender() {
    availabilityObj = {};
    // calender input date
    var fromDate = dataCache.session.data.bookingOptions.fromDate;
    var toDate = dataCache.session.data.bookingOptions.toDate;
    if (isAmaSite && amaBookingObject.isAmaCheckAvailabilitySelected) {
        fromDate = amaBookingObject.fromDate;
        toDate = amaBookingObject.toDate;
    }
    var storageFromDate = moment(fromDate, "MMM Do YY").toDate() || null;
    var storageToDate = moment(toDate, "MMM Do YY").toDate() || null;

    // var tommorow = moment(new Date()).add(1, 'days')['_d'];
    var d1 = storageFromDate || moment(new Date()).add(1, 'days')['_d'];
    //var d2 = storageToDate || moment(new Date()).add(2, 'days')['_d'];

	var d2 = storageToDate || toDateForBooking();

    // const
    // monthNames = [ "Jan", "Feb", "Mar", "Apr", "May", "Jun", "Jul", "Aug", "Sep", "Oct", "Nov", "Dec" ];

    var output1 = moment(d1).format("D MMM YY");
    var output2 = moment(d2).format("D MMM YY");

    initializeDatepickerForBookAStay($('.bas-datepicker-container .input-daterange'), $('.bas-calander-container'));

    $("#input-box1").datepicker("setDate", new Date(moment(output1, "D MMM YY").toDate()));
    $("#input-box2").datepicker("setDate", new Date(moment(output2, "D MMM YY").toDate()));

    setTimeout(function() {
        $("#input-box1").blur();
        $("#input-box2").blur();
    }, 105);
};

function initializeDatepickerForBookAStay(ele, container) {
    ele.datepicker({
        container : container,
        format : 'd M yy',
        startDate : new Date(),
		changeMonth: false,
		changeYear: false,
		stepMonths: 0,
		firstDay: 1,
        templates : {
            leftArrow : '<i class="icon-prev-arrow inline-block"></i>',
            rightArrow : '<i class="icon-prev-arrow inline-block cm-rotate-icon-180 v-middle"></i>'
        }
    });	
}

function hideCalenderInBookAStayPopup() {
    $('.bas-calander-container').removeClass('active');
    $('.bas-calander-container>.datepicker').css('display', 'none');
    $('.bas-hotel-details-container').removeClass('active');
}

function validateSearchInput() {
    // validate using data value in searcbar input
    var searchInputValue = "";
    if ($('#book-a-stay').data('theme') == 'ama-theme') {
        var dropdownText = isAmaCheckAvailability ? $('.check-avblty-wrap .select-dest-placeholder').text() : $(
                '.cm-bas-content-con .dropdown-input').text();
        if (dropdownText != "Select Destinations/Bungalows")
            searchInputValue = dropdownText;
    } else {
        searchInputValue = $('.cm-bas-content-con .searchbar-input').attr("data-selected-search-value");
    }
    if (!searchInputValue) {
        $('.cm-bas-content-con .searchbar-input').effect('shake', {
            "distance" : "5"
        });
        disableBestAvailableButton();
        return false;
    }
    return true;
}

function disableBestAvailableButton() {
    changeBookStayButtonStatus();
    $('.bas-final-detail-wrap').css("display", "none");
    $('#global-re-direct').removeAttr('hrefValue');
}

function changeBookStayButtonStatus() {
    $('.best-avail-rate ').css({
        "opacity" : "0.5"
    });
    $(".best-avail-rate").toggleClass('best-avail-rate-disable', true);
    $(".best-avail-rate").toggleClass('best-avail-rate-enable', false);
}

function getHotelRoomsRootPath() {
    var hiddenDom = $.find("[data-hotel-roomspath]")[0];
    if (hiddenDom != undefined) {
        var hotelRoomspath = $(hiddenDom).data().hotelRoomspath;
        if (hotelRoomspath != undefined && hotelRoomspath.startsWith('https://www.tajhotels.com')) {
            hotelRoomspath = hotelRoomspath.substring(25)
        } else if (hotelRoomspath != undefined && hotelRoomspath.startsWith('https://www.vivantahotels.com')) {
            hotelRoomspath = hotelRoomspath.substring(29)
        } else if (hotelRoomspath != undefined && hotelRoomspath.startsWith('https://www.seleqtionshotels.com')) {
            hotelRoomspath = hotelRoomspath.substring(32)
        }

        return hotelRoomspath;
    }
}

function getDestinationRootPath() {
    var hiddenDom = $.find("[data-destination-rootpath]")[0];
    if (hiddenDom != undefined)
        return $(hiddenDom).data().destinationRootpath
}

function fetchRootPath() {
    var destinationRootPath = getDestinationRootPath();
    var hotelRoomsPath = getHotelRoomsRootPath();
    if (destinationRootPath != undefined)
        return destinationRootPath;

    return hotelRoomsPath;
}

function enableBestAvailableButton(redirectUrl, noUrlStatus) {
    if (!noUrlStatus) {
        $('#global-re-direct, #checkAvailability').attr('hrefValue', redirectUrl);
    }
    if (isAmaSite) {
        $('#checkAvailability').addClass('enabled');
    }
    if (isIHCLCBHomePage() && !(checkboxCheckedStatus() && isEntitySelected())) {
        return;
    }

    $('.best-avail-rate ').css({
        "opacity" : "1",
    });

    $(".best-avail-rate").toggleClass('best-avail-rate-disable', false);
    $(".best-avail-rate").toggleClass('best-avail-rate-enable', true);
    $('.bas-final-detail-wrap').css("display", "inline-block");
    if (retainHolidaysFlow(redirectUrl)) {
        redirectUrl = redirectUrl + "?taj-holiday-redemption";
    }

}

function checkboxCheckedStatus() {
    return $('.ihclcb-checkbox-cont .mr-filter-checkbox').prop("checked");
}

function fetchDateOccupancyAsQueryString() {
    var queryString = '';
    try {
        var bookingOptions = dataCache.session.getData('bookingOptions');
        if(typeof bookingOptions !== 'undefined') { 
            var from = moment(bookingOptions.fromDate, "MMM Do YY").format('DD/MM/YYYY');
            var to = moment(bookingOptions.toDate, "MMM Do YY").format('DD/MM/YYYY');
            var roomOptionArr = bookingOptions.roomOptions;
            var rooms = bookingOptions.roomOptions.length;
            var adults = '';
            var children = '';
            if (roomOptionArr) {
                roomOptionArr.forEach(function(roomObj, index) {
                    adults += roomObj.adults + ",";
                    children += roomObj.children + ",";
                });
                adults = adults.substring(0, adults.length - 1);
                children = children.substring(0, children.length - 1);
            }
            queryString = "from=" + from + "&to=" + to + "&rooms=" + rooms + "&adults=" + adults + "&children=" + children;
        }
    } catch (err) {
        console.error("Error Occured while forming query String using session data ", err);
    }
    return queryString;
}

function retainHolidaysFlow(redirectUrl) {
    var retainHolidays = false;
    var substringUrl = redirectUrl;
    if (redirectUrl && redirectUrl.endsWith(".html")) {
        substringUrl = redirectUrl.substring(0, redirectUrl.length - 5);
    }

    var currentUrl = window.location.href;
    if (currentUrl.indexOf("?taj-holiday-redemption") != -1) {
        if (currentUrl.indexOf(substringUrl) != -1) {
            retainHolidays = true;
        }
    }
    return retainHolidays;
}

function updateHotelChainCodeAndHoteID(bookingOptions) {
    var hotelIdAndChainCodeData = $($.find("[data-hotel-id]")[0]).data();
    if (hotelIdAndChainCodeData) {
        bookingOptions.hotelChainCode = hotelIdAndChainCodeData.hotelChainCode || CHAIN_ID;
        bookingOptions.hotelId = hotelIdAndChainCodeData.hotelId;
    }
}

function numberOfNightsCheck() {
    var currentDate = parseSelectedDate($("#input-box1").datepicker("getDate"));
    var nextDate = parseSelectedDate($("#input-box2").datepicker("getDate"));
    var numberOFNights = moment(nextDate, "MMM Do YY").diff(moment(currentDate, "MMM Do YY"), 'days');
    if (numberOFNights > 10 && $('.best-avail-rate ').hasClass('best-avail-rate-enable'))
        return false;
    else
        return true;

}

function checkHolidayScope() {
    if (!dataCache.session.getData("checkHolidayAvailability")) {
        var bookingOptionsHoliday = dataCache.session.getData("bookingOptions");

        var fromDate = bookingOptionsHoliday.fromDate;
        if (!fromDate || fromDate == '') {
            fromDate = moment(new Date()).add(3, 'days').format("MMM Do YY");
            bookingOptionsHoliday.fromDate = fromDate;
        }

        var toDate = bookingOptionsHoliday.toDate;
        if (!toDate || toDate == '') {
            toDate = moment(new Date()).add(5, 'days').format("MMM Do YY");
            bookingOptionsHoliday.toDate = toDate;
        }

        bookingOptionsHoliday.nights = moment(toDate, "MMM Do YY").diff(moment(fromDate, "MMM Do YY"), 'days');

        var rooms = bookingOptionsHoliday.rooms;
        if (!rooms) {
            rooms = 1;
            bookingOptionsHoliday.rooms = rooms;
        }

        if (!bookingOptionsHoliday.roomOptions) {
            bookingOptionsHoliday.roomOptions = [ {
                adults : 2,
                children : 0,
                initialRoomIndex : 0
            } ];
        }
        dataCache.session.setData("bookingOptions", bookingOptionsHoliday);
        updateCheckAvailability();
    }
}

function dateOccupancyInfoSticky() {
    if ($('.search-container.check-availability-main-wrap').length > 0) {
        var stickyOffset = $('.search-container.check-availability-main-wrap ').offset().top;

        $(window).scroll(function() {
            var sticky = $('.search-container.check-availability-main-wrap '), scroll = $(window).scrollTop();

            if (scroll >= stickyOffset)
                sticky.addClass('mr-stickyScroll');
            else
                sticky.removeClass('mr-stickyScroll');
        });

    }
}

// [TIC-FLOW]
function isTicBased() {
    // checking if any rate code is there in dom which is of TIC Room redemption
    // flow
    var userDetails = getUserData();
    if (userDetails && userDetails.loyaltyInfo && userDetails.loyaltyInfo.length > 0 && $(".tic-room-redemption-rates").length) {
        return true;
    }

    return false;
}

function resetPromoCodeTab() {
    $('.promo-code').val("");
    $('.apply-promo-code-btn').hide();
    $('.promocode-status-text').text("");
    _globalPromoCode = {
        name : null,
        value : null
    };
}

// [IHCL-FLOW]
var entityDetailsObj = new Object();
function fetchIHCLCBEntityDetails() {
    var ihclCbBookingObject = dataCache.session.getData("ihclCbBookingObject");
    if (ihclCbBookingObject && ihclCbBookingObject.isIHCLCBFlow) {
        var entityDetailsData = ihclCbBookingObject.entityDetails;
        if (!entityDetailsData) {
            return;
        }
        for (var entity = 0; entity < entityDetailsData.length; entity++) {
            var partyObj = {};
            var cityObj = {};
            var entityCity = entityDetailsData[entity].city;
            var entityType = entityDetailsData[entity].AccountType_c;
            var entityExisting = entityDetailsObj[entityType];
            if (entityExisting) {
                var exisitingEle = null; // = entityDetailsObj[entityType];
                for ( var cty in entityDetailsObj[entityType]) {
                    if (Object.keys(entityDetailsObj[entityType][cty])[0] == entityCity) {
                        exisitingEle = JSON.parse(JSON.stringify(entityDetailsObj[entityType][cty][entityCity]));
                        break;
                    }
                }
            }
            partyObj['partyName'] = {
                'name' : entityDetailsData[entity].partyName,
                'gstinNo' : entityDetailsData[entity].gSTNTaxID_c,
                'iataNo' : entityDetailsData[entity].iATANumber,
                'partyNo' : entityDetailsData[entity].partyNumber
            }
            // change the names for better reference
            var newArr = [];
            if (exisitingEle) {
                newArr = exisitingEle;
            }
            newArr.push(partyObj);
            cityObj[entityCity] = newArr;
            var existingEntityDetailsObj = entityDetailsObj[entityType] ? JSON.parse(JSON
                    .stringify(entityDetailsObj[entityType])) : null;
            var newEntityDetailsObj = [];
            if (existingEntityDetailsObj) {
                newEntityDetailsObj = existingEntityDetailsObj;
                for ( var cty in existingEntityDetailsObj) {
                    if (Object.keys(existingEntityDetailsObj[cty])[0] == entityCity) {
                        newEntityDetailsObj.splice(cty, 1);
                    }
                }
            }
            newEntityDetailsObj.push(cityObj);
            entityDetailsObj[entityType] = newEntityDetailsObj;
        }
        // console.log(entityDetailsObj);
        populateEntityDropdown(entityDetailsObj);
    }
}

function populateEntityDropdown(entityDetailsObj) {
    var entityType = '';
    Object.keys(entityDetailsObj).forEach(function(entType) {
        entityType += createEntityDropdownList(entType);
        createEntityCityList(entType);
        // createPartyAndGSTNNoDropdown(entType);
    });
    // $('.entity-results#entityDetailsCity').html(entityCity);
    $('.entity-results#entityTypeDetails').html(entityType);
}

function createEntityDropdownList(value) {
    if (value) {
        return '<a class="individual-entity-result">' + value + '</a>';
    }
    return "";
}

function createEntityCityList(entityType, actDrpwn) {
    var entityCity = '';
    entityDetailsObj[entityType].forEach(function(cty) {
        // createEntityCityList(city);
        var extractedCity = Object.keys(cty)[0];
        entityCity += createEntityDropdownList(extractedCity);
        createPartyAndGSTNNoDropdown(cty, actDrpwn);
    });
    if (actDrpwn) {
        $('.active-dropdwn .entity-results#entityDetailsCity').html(entityCity)
    } else {
        $('.entity-results#entityDetailsCity').html(entityCity)
    }
}

function clearEntityDropdown(drpdwnSel) {
    var removableDrpdwn = drpdwnSel.closest('[data-drpdwn-target]').attr('data-drpdwn-target');
    var $caller = $('[data-drpdwn-caller = ' + removableDrpdwn + ']');
    $caller.text($caller.attr('data-entity-category').replace(/([A-Z])/g, ' $1').capitalize());
    $caller.attr('data-entity-selected', '');
    drpdwnSel.html('');
}

function createPartyAndGSTNNoDropdown(city, actDrpwn) {
    var entityPartyName = '';
    var entityGSTNNo = '';
    var entityIATANo = '';
    Object.values(city)[0].forEach(function(obj) {
        entityPartyName += createEntityDropdownList(obj.partyName.name);
        entityGSTNNo += createEntityDropdownList(obj.partyName.gstinNo);
        entityIATANo += createEntityDropdownList(obj.partyName.iataNo);
    });
    if (!actDrpwn) {
        $('.entity-results#entityDetailsPartyName').append(entityPartyName);
        $('.entity-results#entityDetailsGST').append(entityGSTNNo);
        $('.entity-results#entityDetailsIATA').append(entityIATANo);
    } else {
        $('.active-dropdwn .entity-results#entityDetailsPartyName').append(entityPartyName);
        $('.active-dropdwn .entity-results#entityDetailsGST').append(entityGSTNNo);
        $('.active-dropdwn .entity-results#entityDetailsIATA').append(entityIATANo);
    }
}

function isEntitySelected() {
    var userDetailsIHCLCB = dataCache.local.getData("userDetails");
    if (userDetailsIHCLCB
            && ((userDetailsIHCLCB.selectedEntity && userDetailsIHCLCB.selectedEntity.partyName) || (userDetailsIHCLCB.selectedEntityAgent && userDetailsIHCLCB.selectedEntityAgent.partyName))) {
        return true;
    }
    return false;
}

function addEntityDropDownEventsForIHCLCB() {
    try {
        var $entityTypeDropdown = $('#entityTypeDropdownMenu, #entityTypeDropdownMenu1');
        var $entityNameDropdown = $('#entityNameDropdownMenu, #entityNameDropdownMenu1');
        var $entityCityDropdown = $('#entityCityDropdownMenu, #entityCityDropdownMenu1');
        var $iataDropdown = $('#iataDropdownMenu');
        var $gstinDropdown = $('#gstinDropdownMenu, #gstinDropdownMenu1');

        // open popup
        $('[data-drpdwn-caller]').click(
                function(e) {
                    e.stopPropagation();
                    $(this).closest('.ihclcb-book-a-stay-dropdwn-cont').addClass('active-dropdwn').siblings(
                            '.ihclcb-book-a-stay-dropdwn-cont').removeClass('active-dropdwn');
                    var clickedDropdwn = $(this).attr('data-drpdwn-caller');
                    var $drpdwnCont = $('[data-drpdwn-target = ' + clickedDropdwn + ']');
                    $drpdwnCont.closest('.entity-dropdown-cnt-cont').addClass('active-dropdwn').siblings(
                            '.entity-dropdown-cnt-cont').removeClass('active-dropdwn');
                    if ($($drpdwnCont).hasClass('show-dropdown')) {
                        $drpdwnCont.removeClass('show-dropdown');
                    } else {
                        $('[data-drpdwn-target]').removeClass('show-dropdown');
                        $drpdwnCont.addClass('show-dropdown');
                    }
                });

        // disable the entity dropdown for the existing book a stay
        if (!isIHCLCBHomePage()) {
            $('[data-drpdwn-caller].ihclcb-mandetory-field').addClass('entity-dropdown-disabled');
            var userDetailsIHCLCB = dataCache.local.getData('userDetails');
            var selectedEntity = userDetailsIHCLCB.selectedEntity || userDetailsIHCLCB.selectedEntityAgent;
            if (userDetailsIHCLCB && selectedEntity) {
                // var selectedEntity = userDetailsIHCLCB.selectedEntity;
                // if (userDetailsIHCLCB && selectedEntity) {
                $entityTypeDropdown.text(selectedEntity.entityType);
                $entityCityDropdown.text(selectedEntity.city);
                $entityNameDropdown.text(selectedEntity.partyName);
                $gstinDropdown.text(selectedEntity.gSTNTaxID_c);
                // $iataDropdown.text(selectedEntity.iataNumber);
                // }
            }
            return;
        }

        var currentEntityDetails = [];
        var ihclSessionData = dataCache.session.getData("ihclCbBookingObject");
        var relatedPartyNo;
        var extractedObj;
        // get the selected dropdown value
        $('.entity-dropdown-cnt-cont').on(
                'click',
                '.entity-dropdown .individual-entity-result',
                function() {
                    $(this).closest('.entity-dropdown-cnt-cont').addClass('active-dropdwn').siblings(
                            '.entity-dropdown-cnt-cont').removeClass('active-dropdwn')
                    var openedDrpdwn = $(this).closest('.entity-dropdown-container').removeClass('show-dropdown').attr(
                            'data-drpdwn-target');
                    var $dropdwnCalledBy = $('[data-drpdwn-caller = ' + openedDrpdwn + ']');
                    var selectedValue = $(this).text();
                    $dropdwnCalledBy.text(selectedValue);
                    $dropdwnCalledBy.attr('data-entity-selected', selectedValue);

                    var $entityCity = $('.active-dropdwn #entityDetailsCity');
                    var $entityPartyName = $('.active-dropdwn #entityDetailsPartyName');
                    var $entityGSTNNO = $('.active-dropdwn #entityDetailsGST');
                    var $entityIATA = $('.active-dropdwn #entityDetailsIATA');
                    if ($dropdwnCalledBy.attr('data-entity-category') === "entityType") {
                        $entityCityDropdown.closest('.active-dropdwn').find('[data-entity-category="entityCity"]')
                                .removeClass('entity-dropdown-disabled');
                        $entityNameDropdown.closest('.active-dropdwn .ihclcb-book-a-stay-inner-wrp').nextAll().find(
                                '.ihclcb-selected-data').addClass('entity-dropdown-disabled');

                        clearEntityDropdown($entityCity);
                        clearEntityDropdown($entityPartyName);
                        clearEntityDropdown($entityGSTNNO);
                        // clearEntityDropdown($entityIATA);
                        createEntityCityList(selectedValue, true);
                    } else if ($dropdwnCalledBy.attr('data-entity-category') === "entityCity") {
                        $entityNameDropdown.closest('.active-dropdwn').find('[data-entity-category="entityName"]')
                                .removeClass('entity-dropdown-disabled');
                        $entityNameDropdown.closest('.active-dropdwn .ihclcb-book-a-stay-inner-wrp').nextAll().find(
                                '.ihclcb-selected-data').addClass('entity-dropdown-disabled');
                        clearEntityDropdown($entityPartyName);
                        clearEntityDropdown($entityGSTNNO);
                        // clearEntityDropdown($entityIATA);
                        var selectedEntityType = $entityTypeDropdown.closest('.active-dropdwn').find(
                                '[data-entity-category="entityType"]').attr('data-entity-selected');
                        var selectedEntityCity = $entityCityDropdown.closest('.active-dropdwn').find(
                                '[data-entity-category="entityCity"]').attr('data-entity-selected');
                        entityDetailsObj[selectedEntityType].forEach(function(cty) {
                            var extractedCity = Object.keys(cty)[0];
                            if (extractedCity == selectedEntityCity) {
                                extractedObj = Object.assign({}, cty);
                                createPartyAndGSTNNoDropdown(cty, true);
                            }
                        });
                        // createPartyAndGSTNNoDropdown(selectedValue);

                    } else if ($dropdwnCalledBy.attr('data-entity-category') === "entityName") {
                        clearEntityDropdown($entityGSTNNO);
                        // clearEntityDropdown($entityIATA);
                        var name;
                        if (extractedObj) {
                            var data = extractedObj[$entityCityDropdown.closest('.active-dropdwn').find(
                                    '[data-entity-category="entityCity"]').text()];
                        }
                        var clickedEntityNameIndex = $(this).index();
                        for (name = 0; name < data.length; name++) {
                            if (data[name].partyName.name == selectedValue && name == clickedEntityNameIndex) {
                                var gstDropdownList = createEntityDropdownList(data[name].partyName.gstinNo);
                                // var iataDropdownList = createEntityDropdownList(data[name].partyName.iataNo);
                                relatedPartyNo = data[name].partyName.partyNo;
                                if (gstDropdownList) {
                                    $('.entity-results#entityDetailsGST').html(gstDropdownList);
                                    $gstinDropdown.closest('.active-dropdwn').find('[data-entity-category="gstinNo"]')
                                            .removeClass('entity-dropdown-disabled');
                                } else {
                                    $gstinDropdown.addClass('entity-dropdown-disabled');
                                }
                                // if (iataDropdownList) {
                                // $('.entity-results#entityDetailsIATA').html(iataDropdownList);
                                // $iataDropdown.removeClass('entity-dropdown-disabled');
                                // } else {
                                // $iataDropdown.addClass('entity-dropdown-disabled');
                                // }
                                break;
                            }
                        }
                    }

                    var attributeID = $dropdwnCalledBy.attr("id");
                    var selectedEntityType, selectedEntityCity, selectedPartyName, selectedGSTNo;
                    var typeOfEntitySelection;
                    if (attributeID.includes("1")) {
                        typeOfEntitySelection = "agent";
                        selectedEntityType = $('#entityTypeDropdownMenu1').attr('data-entity-selected') || '';
                        selectedEntityCity = $('#entityCityDropdownMenu1').attr('data-entity-selected') || '';
                        selectedPartyName = $('#entityNameDropdownMenu1').attr('data-entity-selected') || '';
                        selectedGSTNo = $('#gstinDropdownMenu1').attr('data-entity-selected');

                        var selectedEntityAgent = new Object();
                        selectedEntityAgent.entityType = selectedEntityType;
                        selectedEntityAgent.city = selectedEntityCity;
                        selectedEntityAgent.partyName = selectedPartyName;
                        selectedEntityAgent.gSTNTaxID_c = selectedGSTNo;
                        selectedEntityAgent.partyNumber = relatedPartyNo;
                        selectedEntityAgent.iataNumber = selectedIATA;

                        addSelectedValueToIHCLCBSession(selectedEntityAgent);
                    } else {
                        typeOfEntitySelection = "corporate";
                        selectedEntityType = $('#entityTypeDropdownMenu').attr('data-entity-selected') || '';
                        selectedEntityCity = $('#entityCityDropdownMenu').attr('data-entity-selected') || '';
                        selectedPartyName = $('#entityNameDropdownMenu').attr('data-entity-selected') || '';
                        selectedGSTNo = $('#gstinDropdownMenu').attr('data-entity-selected');

                        var selectedEntity = new Object();
                        selectedEntity.entityType = selectedEntityType;
                        selectedEntity.city = selectedEntityCity;
                        selectedEntity.partyName = selectedPartyName;
                        selectedEntity.gSTNTaxID_c = selectedGSTNo;
                        selectedEntity.partyNumber = relatedPartyNo;
                        selectedEntity.iataNumber = selectedIATA;

                        addSelectedValueToIHCLCBSession(selectedEntity);
                    }

                    var selectedIATA;
                    // var selectedIATA = $iataDropdown.attr('data-entity-selected') || $iataDropdown.text();
                    // if ($entityNameDropdown.attr('data-entity-selected') ||
                    // $gstinDropdown.attr('data-entity-selected')
                    // || $iataDropdown.attr('data-entity-selected')) {
                    if ($entityTypeDropdown.closest('.active-dropdwn').find('[data-entity-category="entityType"]')
                            .attr('data-entity-selected')
                            && $entityCityDropdown.closest('.active-dropdwn').find(
                                    '[data-entity-category="entityCity"]').attr('data-entity-selected')
                            && $entityNameDropdown.closest('.active-dropdwn').find(
                                    '[data-entity-category="entityName"]').attr('data-entity-selected')) {
                        addSelectedValueToIHCLCBSession(typeOfEntitySelection, selectedEntityType, selectedEntityCity,
                                selectedPartyName, selectedGSTNo, selectedIATA);
                        if (isEntityDropdownSelected() && checkboxCheckedStatus()) {
                            enableBestAvailableButton('', true);
                        }
                    } else {
                        changeBookStayButtonStatus();
                    }
                });

        // close the entity dropdown while clicking outside;
        $(window).click(function(e) {
            var container = $(".entity-dropdown-container");
            if (!container.is(e.target) && container.has(e.target).length === 0) {
                $('.show-dropdown').removeClass('show-dropdown');
            }
        });

        function addSelectedValueToIHCLCBSession(entityObject) {

            var userDetails = dataCache.local.getData("userDetails");
            if (userDetails) {
                if (entityObject.entityType === "Travel Agent") {
                    userDetails.selectedEntityAgent = entityObject;
                } else if (entityObject.entityType === "Corporate") {
                    userDetails.selectedEntity = entityObject;
                }
            }
            dataCache.local.setData("userDetails", userDetails);
        }
    } catch (error) {
        console.error("Error in /apps/tajhotels/components/content/book-a-stay/clientlibs/js/book-a-stay.js ",
                error.stack);
    }
}

function isEntityDropdownSelected() {
    var entityDrpDwn = $('.ihclcb-corporate-book-stay .active-dropdwn .ihclcb-mandetory-field');
    var i;
    for (i = 0; i < entityDrpDwn.length; i++) {
        if (!$(entityDrpDwn[i]).attr('data-entity-selected')) {
            return false;
        }
    }
    return true;
}

// [IHCL_CB ENDS]


// check for same day checkin checkout
function checkSameDayCheckout(currVal){
	var sameDayCheckout = dataCache.session.getData("sameDayCheckout");
    if(sameDayCheckout && sameDayCheckout === "true"){
       	return moment(currVal, "D MMM YY");
    } else {
        return moment(currVal, "D MMM YY").add(1, 'days');
    }
}


function initialBookingSetup(){
	var sameDayCheckout = dataCache.session.getData("sameDayCheckout");
    if(sameDayCheckout && sameDayCheckout === "true"){
       	return moment(new Date()).add(1, 'days').format("MMM Do YY");
    } else {
		return moment(new Date()).add(2, 'days').format("MMM Do YY");
    }
}
function sebNightsCheck() {
    var currentDate = parseSelectedDate($("#input-box1").datepicker("getDate"));
    var nextDate = parseSelectedDate($("#input-box2").datepicker("getDate"));
    var numberOFNights = moment(nextDate, "MMM Do YY").diff(moment(currentDate, "MMM Do YY"), 'days');
    var sebObject = getQuerySebRedemption();
    if(sebObject && sebObject != null && sebObject != undefined &&  sebObject.sebRedemption == "true"){
        var sebNights = parseInt(sebObject.sebEntitlement);
        var rooms = $('.bas-room-no').length;
        if(parseInt(numberOFNights) * parseInt(rooms) > parseInt(sebNights))
        return false;
    }
      else
        return true;

}
function getQuerySebRedemption() {
	return dataCache.session.getData('sebObject');
}

	var propertyArray = [];
$('document').ready(
    function() {

        try {
            if ($('#book-a-stay').data('theme') == 'ama-theme') {
				
                createSelectPlaceHolder();
            } else {
                createSearchPlaceHolder();
            }
        } catch (error) {
            console.error("Error in /apps/tajhotels/components/content/book-a-stay/clientlibs/js/searchBar.js ",
                    error.stack);
        }

    });
var amaSearchFlag = false;
function createSelectPlaceHolder() {
	var selectInput = $('.dropdown-input');
	var SELECT_INPUT_DEBOUNCE_RATE = 1000;
	var contentRootPath = $('#contentRootPath').val();
    if($('#book-a-stay').data('theme') == 'ama-theme' && amaSearchFlag){
		return;
	}
    else{
        amaSearchFlag = true;
        $.ajax({
            method : "GET",
            url : "/bin/search.data/" + contentRootPath.replace(/\/content\//g, ":") + "//" + "/result/searchCache.json"
        }).done(function(res,count) {
            // populate search result in banner search bar
			createPropertyArray(res);
            addSelectionResultsInBanner(res);
            updateCheckAvailabilityAma();
        
            // populate search result in book a stay popup
            addSelectionResults(res);
            updateCheckAvailability();
        }).fail(function() {
            console.error('Ajax call failed.')
        });
    }

function createPropertyArray(res) {
	 if (Object.keys(res.destinations).length) {
		var destinationProperty = [];
        var destinations = res.destinations;
        destinations.forEach(function(destination) {
            destinationProperty.push(destination);

        });
		propertyArray.destination = destinationProperty;
    }
	var websiteHotels = res.hotels.website;
	if (Object.keys(websiteHotels).length) {
		var hotelProperty = [];
		websiteHotels.forEach(function(hotel) {
			hotelProperty.push(hotel);			
		});
		propertyArray.hotel = hotelProperty;
	}
}
function addSelectionResults(res) {
	if($('#select-results').is(':empty')){
    if (Object.keys(res.destinations).length) {
		$('#select-results').append('<li class="dest-item property-heading">Destinations</li>');
        var destinations = res.destinations;
        destinations.forEach(function(destination) {
            var destRedirectPath = destination.path;
            var destinationString = destination.title;
            var destHtml = createDestResult(destination.title, destRedirectPath);
            $('#select-results').append(destHtml);

        });
    }
	var websiteHotels = res.hotels.website;
	if (Object.keys(websiteHotels).length) {
		$('#select-results').append('<li class="dest-item property-heading">Hotels</li>');
		websiteHotels.forEach(function(hotel) {
			var hotelDestination = hotel.title.split(', ');
			
				var reDirectToRoomPath = hotel.path.concat("accommodations/");
				var hotelHtml = createHotelResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.isOnlyBungalowPage);
				$('#select-results').append(hotelHtml);

		});
	}
}
}
function updateCheckAvailability() {

    var placeHolder = $("#book-a-stay .dropdown-input").text();
    var items = $('#book-a-stay #select-results li');
    items.each(function() {
        if (placeHolder == $(this).text()) {
            updateDestination($(this).find('a'));
        }
    });
}

function updateCheckAvailabilityAma() {
    var amaTextItem = $('.ama-info-strip').prev();
    if (amaTextItem.hasClass("ama-text")) {
        var placeHolder = amaTextItem.text().trim();
        var parent = $('.check-avblty-wrap .dropdown');

        var items = $('.check-avblty-wrap .dropdown .dropdown-menu li');
        items.each(function() {
            var $this = $(this);
            var itemText = $this.attr('id');
            if ($this.hasClass('hotel-item')) {
                var arr = $this.attr('id').split(',');
                itemText = arr[0];
            }
            if (placeHolder.includes(itemText) ) {
                updateDestination($(this), parent);
            }
        });
    }
}

$(selectInput).on("keyup", debounce(function(e) {
    e.stopPropagation();
		$('#select-results')[0].classList.remove("d-none");
        if (selectInput.val().length > 0) {
            clearSelectResults();


	        $.ajax({
            method : "GET",
            url : "/bin/search.data/" + contentRootPath.replace(/\/content\//g, ":") + "//" + selectInput.val() + "/result/searchCache.json"
			}).done(function(res,count) {
				    if (Object.keys(res.destinations).length) {
						$('#select-results').append('<li class="dest-item property-heading">Destinations</li>');
						var destinations = res.destinations;
						destinations.forEach(function(destination) {
							var destRedirectPath = destination.path;
							var destinationString = destination.title;
							var destHtml = createDestResult(destination.title, destRedirectPath);
							$('#select-results').append(destHtml);

						});
					}
					var websiteHotels = res.hotels.website;
					if (Object.keys(websiteHotels).length) {
						$('#select-results').append('<li class="dest-item property-heading">Hotels</li>');
						websiteHotels.forEach(function(hotel) {
							var hotelDestination = hotel.title.split(', ');

								var reDirectToRoomPath = hotel.path.concat("accommodations/");
								var hotelHtml = createHotelResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.isOnlyBungalowPage);
								$('#select-results').append(hotelHtml);

						});
					}
					if(!(Object.keys(websiteHotels).length) && !(Object.keys(res.destinations).length)){
						$('#select-results').append('<li>No results found. Please try another keyword</li>');
					}

			}).fail(function() {
            console.error('Ajax call failed.')
			});

        } else {

		 showSelectResults();
        }


}, SELECT_INPUT_DEBOUNCE_RATE));

function clearSelectResults(){
	$('#select-results').empty();
    var items = $('#book-a-stay #select-results li');
   // items.each(function(item){ 
	//if(!(this.classList.contains("property-heading"))){
     //   this.classList.add("d-none");
	//}
    //});
}

function showSelectResults(){
	$('#select-results').empty();
	if(propertyArray.destination && propertyArray.destination.length){
		$('#select-results').append('<li class="dest-item property-heading">Destinations</li>');
						var destinations = propertyArray.destination;
						destinations.forEach(function(destination) {
							var destRedirectPath = destination.path;
							var destinationString = destination.title;
							var destHtml = createDestResult(destination.title, destRedirectPath);
							$('#select-results').append(destHtml);

						});
	}
	
		if(propertyArray.hotel && propertyArray.hotel.length){
								$('#select-results').append('<li class="dest-item property-heading">Hotels</li>');
						propertyArray.hotel.forEach(function(hotel) {
							var hotelDestination = hotel.title.split(', ');
							
								var reDirectToRoomPath = hotel.path.concat("accommodations/");
								var hotelHtml = createHotelResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.isOnlyBungalowPage);
								$('#select-results').append(hotelHtml);
							
						});
	}
	
}

function addSelectionResultsInBanner(res) {
    if (Object.keys(res.destinations).length) {
		var destArray = [];
		var countDest = 0;
        var destinations = res.destinations;
        destinations.forEach(function(destination) {

            var websiteHotels = res.hotels.website;
            if (Object.keys(websiteHotels).length) {
				var hotelArray = [];
				var count = 0;
                websiteHotels.forEach(function(hotel) {

                    var hotelDestination = hotel.title.split(', ');
                    if (hotelDestination[1] == destination.title) {
						hotelArray[count] = hotel;
						count++;

                    }
                });


				hotelArray.sort(function(a, b) {
				  var nameA = a.title.toUpperCase(); // ignore upper and lowercase
				  var nameB = b.title.toUpperCase(); // ignore upper and lowercase
				  if (nameA < nameB) {
					return -1;
				  }
				  if (nameA > nameB) {
					return 1;
				  }

				  return 0;
				});
				destination.hotelArray = hotelArray;
				destArray[countDest] = destination;
				countDest++;


            }
        });
			destArray.sort(function(a, b) {
			  var nameA = a.title.toUpperCase(); // ignore upper and lowercase
			  var nameB = b.title.toUpperCase(); // ignore upper and lowercase
			  if (nameA < nameB) {
				return -1;
			  }
			  if (nameA > nameB) {
				return 1;
			  }

			  // names must be equal
			  return 0;
			});

			destArray.forEach(function(destination) {
			var destHtml = createDestResultBanner(destination.title, destination.path);
            $('.destination-hotels').append(destHtml);
			$('#search-properties').append(destHtml);

			var hotelArr = destination.hotelArray;
			hotelArr.forEach(function(hotel) {
			var reDirectToRoomPath = hotel.path.concat("accommodations/");	
			var hotelHtml = createHotelResultBanner(hotel.title, reDirectToRoomPath, hotel.id,
							hotel.maxGuests, hotel.maxBeds, hotel.id);

			$('.destination-hotels').append(hotelHtml);	
			$('#search-properties').append(hotelHtml);	
				});
			});
    }
}
function createDestResult(title, path) {
    return '<li class="dest-item ama-dest-item"><a class="select-result-item" data-redirect-path="' + path + '">' + title
            + '</a></li>';
}
function createHotelResult(title, path, hotelId, isOnlyBungalow) {
    return '<li class="hotel-item"><a class="select-result-item" data-hotelId="' + hotelId
            + '"data-isOnlyBungalow="'+ isOnlyBungalow + '" data-redirect-path="' + path + '">' + title + '</a></li>';
}

function createDestResultBanner(title, path) {
    return '<li id="' + title + '" class="dest-item" data-redirect-path="' + path + '">' + title + '</li>';
}

function createHotelResultBanner(title, path, hotelId, maxGuests, maxBeds, hotelId) {
    return '<li id="' + title + '" class="hotel-item" data-hotelid = "' + hotelId + '" data-max-guests="'
            + maxGuests + '" data-max-beds="' + maxBeds  +  '" data-redirect-path="' + path + '">' + title + '</li>';
}

$('.search-bar-wrapper-container').click(function() {
    $(this).toggleClass('rotate-arrow');
    if(!($('#book-a-stay .suggestions-wrap').is(':visible')))
		$('#book-a-stay .suggestions-wrap').toggle();
    if(!($('.suggestions-wrap').is(':visible')))
		$('.suggestions-wrap').toggle();
    if(!($('#select-results').is(':visible'))) 
		$('#select-results')[0].classList.remove("d-none");

});
$('window').click(function() {

    if($('.suggestions-wrap').is(':visible'))
		$('.suggestions-wrap').toggle();
});

$('.bas-date-container-main-wrap, .bas-best-available-rate-container clearfix').click(function() {
    $('.suggestions-wrap').hide();
});

$('#bas-checkbox').click(function() {
    var $this = $(this);
    if (!$this.attr('checked')) {
        $this.attr('checked', true);
    } else {
        $this.removeAttr('checked');
    }
});

$('#book-a-stay').on('click', 'a.select-result-item', function() {
    updateDestination($(this));
});
}
function updateDestination(el) {
var amaSearchResult = $('.select-dest-placeholder');
var selectedLocation = el.text();
var selectedHotelId = '';
var subtitlePlaceholder = $('#checkAvailSubtitle');
var isOnlyBungalow= false;
subtitlePlaceholder.text('');
amaSearchResult.text(selectedLocation);
amaSearchResult.val(selectedLocation);
if (el.attr('data-hotelid')) {
    selectedHotelId = el.attr('data-hotelid');
}

var reDirectPath = el.data("redirect-path");
amaSearchResult.attr('data-selected-search-value', selectedLocation);
$("#hotelIdFromSearch").text(selectedHotelId);
$('.suggestions-wrap').hide();
$('.search-bar-wrapper-container').removeClass('rotate-arrow');
if (el.data('max-guests') && el.data('max-beds')) {
    var subtitleText = el.data('max-guests') + ' | ' + el.data('max-beds');
    subtitlePlaceholder.text(subtitleText);
}
enableBestAvailableButton(reDirectPath);
}

function createSearchPlaceHolder() {
var searchSelector = "#booking-search";
var searchWidget = $(searchSelector);
var searchInput = $(searchSelector).find(".searchbar-input");
var searchBarWrap = searchInput.closest(".searchBar-wrap");
var suggestionsContainer = searchBarWrap.siblings('.suggestions-wrap');
var suggestionsWrapper = suggestionsContainer.find('.suggestions-container');
var searchSuggestionsContainer = suggestionsWrapper.children('.search-suggestions-container');
var trendingSuggestionsContainer = suggestionsWrapper.children('.trending-suggestions-container');
var wholeWrapper = searchBarWrap.closest('.search-and-suggestions-wrapper');
var closeIcon = searchInput.siblings('.close-icon');
var hotelResultCont = searchWidget.find('#hotel-result-cont');
var hotelResults = hotelResultCont.find('#hotel-result');
var websiteHotelResults = hotelResultCont.find('#website-hotel-result');
var otherHotelResults = hotelResultCont.find('#others-hotel-result');
var destResultCont = searchWidget.find('#dest-result-cont');
var destResults = destResultCont.find('#dest-result');
var restaurantResultCont = searchWidget.find('#restrnt-result-cont');
var restaurantResults = restaurantResultCont.find('#restrnt-result');
var nosearchTextBooking = $('#booking-search').find('#NoResults');
var isTic = $('.cm-page-container').hasClass('tic');
var keys = {
    37 : 1,
    38 : 1,
    39 : 1,
    40 : 1,
    32 : 1,
    33 : 1,
    34 : 1,
    35 : 1,
    36 : 1
};

var holidayResultsCont = searchWidget.find('#holiday-result-cont');
var holidayResults = holidayResultsCont.find('#holiday-result');
var pageScopeData = $('#page-scope').attr('data-pagescope');

var holidayHotelResultsCont = searchWidget.find('#holiday-hotel-result-cont');
var holidayHotelResults = holidayHotelResultsCont.find('#holiday-hotel-result');

var SEARCH_INPUT_DEBOUNCE_RATE = 1000;

var preventDefault = function(e) {
    e = e || window.event;
    if (e.preventDefault)
        e.preventDefault();
    e.returnValue = false;
}

var preventDefaultForScrollKeys = function(e) {
    if (keys[e.keyCode]) {
        preventDefault(e);
        return false;
    }
}

function hideSuggestionsContainer() {
    if (!$(suggestionsContainer).hasClass('display-none')) {
        $(suggestionsContainer).addClass('display-none');
    }
    $(document).off("keyup", searchSelector);
    $(document).off("click", searchSelector);
}

function showSuggestionsContainer() {
    $(suggestionsContainer).removeClass('display-none');
    $(document).on("keyup", searchSelector, function(e) {
        // Esc pressed
        if (e.keyCode === 27) {
            $(searchInput).blur();
            hideSuggestionsContainer();
        }
    });

    $(document).on("click", searchSelector, function(e) {
        e.stopPropagation();
        hideSuggestionsContainer();
        if (!$(searchSuggestionsContainer).hasClass('display-none')) {
            $(searchSuggestionsContainer).addClass('display-none');
        }
        if (!$(trendingSuggestionsContainer).hasClass('display-none')) {
            $(trendingSuggestionsContainer).addClass('display-none');
        }
        $(wholeWrapper).removeClass('input-scroll-top');
    });
}

$(suggestionsWrapper).on("click", function(event) {
    event.stopPropagation();
});

$(closeIcon).on("click", function(e) {
    e.stopPropagation();
    $(wholeWrapper).removeClass('input-scroll-top');
    $(closeIcon).addClass('display-none');
    $(closeIcon).css("display", "none");
    if (!$(trendingSuggestionsContainer).hasClass('display-none')) {
        $(trendingSuggestionsContainer).addClass('display-none');
    }
    if (!$(searchSuggestionsContainer).hasClass('display-none')) {
        $(searchSuggestionsContainer).addClass('display-none');
    }
    hideSuggestionsContainer();
});

$(searchInput).on('click', function(e) {
    e.stopPropagation();
});

$(searchInput).on("keyup", debounce(function(e) {
    e.stopPropagation();
    if (e.keyCode !== 27 && e.keyCode !== 9 && e.keyCode !== 40 && e.keyCode !== 38 && e.keyCode !== 13) {
        if (searchInput.val().length > 1) {
            clearSearchResults();
            performSearch(searchInput.val()).done(function() {
                showSuggestionsContainer();
                if (!$(trendingSuggestionsContainer).hasClass('display-none')) {
                    $(trendingSuggestionsContainer).addClass('display-none');
                }
                $(searchSuggestionsContainer).removeClass('display-none');
            });
        } else {
            nosearchTextBooking.hide();
            hideSuggestionsContainer();
            if (!$(searchSuggestionsContainer).hasClass('display-none')) {
                $(searchSuggestionsContainer).addClass('display-none');
            }
            $(trendingSuggestionsContainer).removeClass('display-none');
        }
    } else {
        chooseDownUpEnterList(e);
    }
    if (window.matchMedia('(max-width: 767px)').matches) {
        $(closeIcon).removeClass('display-none');
        $(closeIcon).css('display', 'inline-block');
    }
}, SEARCH_INPUT_DEBOUNCE_RATE));




// Seach List to key up, down to show
function chooseDownUpEnterList(e) {
    var $listItems = $('.individual-trends:visible');
    var $selected = $listItems.filter('.active');
    var $current = $selected;
    var currentIndex = 0;
    var listLength = $listItems.length;
    if (e.keyCode == 40) {
        $listItems.removeClass('active');
        if ($selected.length == 0) {
            $current = $listItems.first();
        } else {
            currentIndex = $listItems.index($current);
            currentIndex = (currentIndex + 1) % listLength;
            $current = $listItems.eq(currentIndex);
        }
        $current.addClass('active');
        $(".suggestions-container").scrollTop(0);
        $(".suggestions-container").scrollTop($($current).offset().top - $(".suggestions-container").height());
    }
    if (e.keyCode == 38) {
        $listItems.removeClass('active');
        if ($selected.length == 0) {
            $current = $listItems.last();
        } else {
            currentIndex = $listItems.index($current);
            currentIndex = (currentIndex - 1) % listLength;
            $current = $listItems.eq(currentIndex);
        }
        $current.addClass('active');
        $(".suggestions-container").scrollTop(0);
        $(".suggestions-container").scrollTop($($current).offset().top - $(".suggestions-container").height());
    }
    if (e.keyCode == 13) {
        if ($current.hasClass("active")) {
            $($current).focus().trigger('click');
            // var getText = $($current).text();
            // $(searchInput).val(getText);
        }
    }
}

function performSearch(key) {

    var contentRootPath = $('#contentRootPath').val();
    var otherWebsitePath = $('#basOtherWebsitePath').val();
    var appendDestName = $('#appendDestName').val();

    var ihclCbBookingObject = dataCache.session.getData("ihclCbBookingObject");
    if (ihclCbBookingObject) {
        if (ihclCbBookingObject.isIHCLCBFlow) {
            contentRootPath = '/content/ihclcb';
            otherWebsitePath = otherWebsitePath + '_:ihclcb';
        }
    }

    return $.ajax(
            {
                method : "GET",
                url : "/bin/search.data/" + contentRootPath.replace(/\/content\//g, ":") + "/"
                        + otherWebsitePath.replace(/\/content\//g, ":").replace(",", "_") + "/" + key
                        + "/result/searchCache.json"
            }).done(function(res) {

        // [TIC-FLOW]
        var userDetails = getUserData();
        var bookingOptionsSessionData = dataCache.session.getData("bookingOptions");
        if (userDetails && userDetails.tier && bookingOptionsSessionData && bookingOptionsSessionData.flow) {
            bookingOptionsSessionData.flow = '';
            dataCache.session.setData("bookingOptions", bookingOptionsSessionData);
        }

        clearSearchResults();
        removeRedirectionForBestAvailableRatesButton();
        addHotelSearchResults(res.hotels,contentRootPath,otherWebsitePath);
        if (!isTic) {
            addDestSearchResults(res.destinations);
        }
        addHolidaySearchResults(res.holidays);
        addHolidayHotelSearchResults(res.holidayHotels);
        holidayFunction(res);
    }).fail(function() {
        clearSearchResults();
    });
}

function isHolidayResultAvailable() {
    if (holidayResults.children().length > 0) {
        return true;
    } else {
        return false;
    }
}

function isHolidayHotelResultAvailable() {
    if (holidayHotelResults.children().length > 0) {
        return true;
    } else {
        return false;
    }
}

function holidayFunction(res) {
    if (pageScopeData == "Taj Holidays") {
        // hide all tab and restaurant,experience contains in holiday page
        ifHolidayPage = true;
        if (isHolidayResultAvailable() || isHolidayHotelResultAvailable()) {
            holidayResultsCont.show();
            holidayHotelResultsCont.show();

            hotelResultCont.hide();
            destResultCont.hide();

            if (!isHolidayResultAvailable())
                holidayResultsCont.hide();

            else if (!isHolidayHotelResultAvailable())

                holidayHotelResultsCont.hide();

        }
        showNoResultsHoliday(res);

    } else {
        showNoResults(res);
    }
}

function showNoResults(res) {
    if ((Object.keys(res.hotels.website).length == 0) && (Object.keys(res.hotels.others).length == 0)
            && (Object.keys(res.destinations).length == 0)) {
        nosearchTextBooking.show();
    } else {
        nosearchTextBooking.hide();
    }
}

function showNoResultsHoliday(res) {
    if ((Object.keys(res.hotels.website).length == 0) && (Object.keys(res.hotels.others).length == 0)
            && (Object.keys(res.destinations).length == 0) && (Object.keys(res.holidays).length == 0)
            && (Object.keys(res.holidayHotels).length == 0)) {
        nosearchTextBooking.show();
    } else {
        nosearchTextBooking.hide();
    }

}

function removeRedirectionForBestAvailableRatesButton() {
    return $("#global-re-direct").removeAttr("href");
}

function clearSearchResults() {
    hotelResultCont.hide();
    otherHotelResults.empty();
    websiteHotelResults.empty();
    destResultCont.hide();
    destResults.empty();
    restaurantResultCont.hide();
    restaurantResults.empty();
    holidayResultsCont.hide();
    holidayResults.empty();
    holidayHotelResultsCont.hide();
    holidayHotelResults.empty();
}

function addHotelSearchResults(hotels,contentRootPath,otherWebsitePath) {
    if (Object.keys(hotels).length) {
        var websiteHotels = hotels.website;
        var otherHotels = hotels.others;
		
		var websiteHotelsGrouped = brandWiseSplitOtherHotels(websiteHotels);
		hotelResultCont.find('.website-result').remove();
			
        if (!isIHCLCBSite()) {
            if (Object.keys(websiteHotels).length) {
			 websiteHotelsGrouped.forEach(function(group) {
				var brandName  = Object.keys(group)[0];
				var brandArray = group[brandName];
				websiteHotelResults.append('<p class="explore-heading website-result"><img class="destination-hotel-icon" src="/content/dam/tajhotels/icons/style-icons/location.svg" alt="Location icon">'+
                                '<span class="trending-explore-taj-text trending-search-text">'+brandName+' Hotels</span></p>');
					brandArray.forEach(function(hotel) {
						var ROOMS_PATH = "rooms-and-suites/";
						var reDirectToRoomPath = hotel.path.replace(".html", "");
						reDirectToRoomPath = reDirectToRoomPath + ROOMS_PATH;
						if (reDirectToRoomPath != "" && reDirectToRoomPath != null && reDirectToRoomPath != undefined) {
							reDirectToRoomPath = reDirectToRoomPath.replace("//", "/");
						}
						if(contentRootPath.indexOf("tajhotels") != -1 && otherWebsitePath.indexOf("taj-inner-circle") != -1){
					   
							//if(hotel.path.indexOf("tajinnercircle") != -1){
								var resultHtml = createSearchResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.sameDayCheckout);
								websiteHotelResults.append(resultHtml);
							//}
						}
						else if(contentRootPath.indexOf("tajhotels") != -1 && !(otherWebsitePath.indexOf("taj-inner-circle") != -1)){
							if(!(hotel.path.indexOf("tajinnercircle") != -1)){
                                if(hotel.id == "99999" && window.location.href.includes('//taj-dev65-02.adobecqms.net')){
                                    let tajhotelsDomainURL_1 = "https:/www.tajhotels.com";
                                    let tajhotelsDomainURL_2 = "https://www.tajhotels.com";
                                    if(reDirectToRoomPath.startsWith(tajhotelsDomainURL_1)){
                                        reDirectToRoomPath = reDirectToRoomPath.substr(tajhotelsDomainURL_1.length);
                                    }
                                    if(reDirectToRoomPath.startsWith(tajhotelsDomainURL_2)){
                                        reDirectToRoomPath = reDirectToRoomPath.substr(tajhotelsDomainURL_2.length);
                                    }
                                	reDirectToRoomPath = "/en-in/swt/?redirectUrl=" + hotel.path;
                                }
								var resultHtml = createSearchResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.sameDayCheckout);
								websiteHotelResults.append(resultHtml);
							}
						}
						else{
						var resultHtml = createSearchResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.sameDayCheckout);
						websiteHotelResults.append(resultHtml);
					}
						hotelResultCont.find('.website-result').show();
					});
				});
            }
			otherHotelsGrouped = brandWiseSplitOtherHotels(otherHotels);
			
            if (otherHotels && Object.keys(otherHotels).length) {
				hotelResultCont.find('.others-result').remove();
                otherHotelsGrouped.forEach(function(group) {
					var brandName  = Object.keys(group)[0];
					var brandArray = group[brandName];
					otherHotelResults.append('<p class="explore-heading others-result"><img class="destination-hotel-icon" src="/content/dam/tajhotels/icons/style-icons/location.svg" alt="Location icon">'+
                                '<span class="trending-explore-taj-text trending-search-text">'+brandName+' Hotels</span></p>');
					brandArray.forEach(function(hotel) {
						var ROOMS_PATH = "rooms-and-suites/";
						var reDirectToRoomPath = hotel.path.replace(".html", "");
						reDirectToRoomPath = reDirectToRoomPath + ROOMS_PATH;
						if (reDirectToRoomPath != "" && reDirectToRoomPath != null && reDirectToRoomPath != undefined) {
							if (!reDirectToRoomPath.includes('https')) {
								reDirectToRoomPath = reDirectToRoomPath.replace("//", "/");
							}
						}
						if(!(hotel.path.indexOf("tajinnercircle") != -1)){
                            if(hotel.id == "99999" && window.location.href.includes('//taj-dev65-02.adobecqms.net')){
                                let tajhotelsDomainURL_1 = "https:/www.tajhotels.com";
                                let tajhotelsDomainURL_2 = "https://www.tajhotels.com";
                                if(hotel.path.startsWith(tajhotelsDomainURL_1)){
                                    hotel.path = hotel.path.substr(tajhotelsDomainURL_1.length);
                                }
                                if(hotel.path.startsWith(tajhotelsDomainURL_2)){
                                    hotel.path = hotel.path.substr(tajhotelsDomainURL_2.length);
                                }
                                hotel.path = "/en-in/swt/?redirectUrl=" + hotel.path;
                            }
                            // starts-new changes for IHCL CrossBrand
                            let seleqtionsDomainURL_1 = "https://www.seleqtionshotels.com";
                            let vivantaDomainURL_1 = "https://www.vivantahotels.com";
                            let amaDomainURL_1 = "https://www.amastaysandtrails.com";
                            let tajDomainURL_1 = "https://www.tajhotels.com";
                                if((localStorage.getItem("access_token") != null && localStorage.getItem("access_token") != undefined) && (hotel.path.startsWith(tajDomainURL_1) || hotel.path.startsWith(seleqtionsDomainURL_1) || hotel.path.startsWith(vivantaDomainURL_1) || hotel.path.startsWith(amaDomainURL_1))){
                                    reDirectToRoomPath = "/en-in/swt/?redirectUrl=" + reDirectToRoomPath;
                             }
                     // ends-new changes for IHCL CrossBrand
							var resultHtml = createSearchResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.sameDayCheckout);
							otherHotelResults.append(resultHtml);
						}
						hotelResultCont.find('.others-result').show();
					});
				});
            }
        } else if (isIHCLCBSite() && otherHotels && Object.keys(otherHotels).length) {
            // [IHCLCB]iterating over result.
            otherHotels.forEach(function(hotel) {
                var ROOMS_PATH = "rooms-and-suites/";
                var reDirectToRoomPath = hotel.path.replace(".html", "");
                reDirectToRoomPath = reDirectToRoomPath + ROOMS_PATH;
                if (reDirectToRoomPath != "" && reDirectToRoomPath != null && reDirectToRoomPath != undefined
                        && reDirectToRoomPath.includes('/corporate-booking/')
                        && !reDirectToRoomPath.includes('/ama-trails/')) {
                    if (!reDirectToRoomPath.includes('https')) {
                        reDirectToRoomPath = reDirectToRoomPath.replace("//", "/");
                    }
                    var resultHtml = createSearchResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.sameDayCheckout);
                    websiteHotelResults.append(resultHtml);
                    hotelResultCont.find('.website-result').show();
                }
                // [IHCLCB]this is intentional hide for ihclccb
                hotelResultCont.find('.others-result').hide();
            });
        }
        if (websiteHotels && Object.keys(websiteHotels).length == 0) {
            hotelResultCont.find('.website-result').hide();
        }
        if (otherHotels && Object.keys(otherHotels).length == 0) {
            hotelResultCont.find('.others-result').hide();
        }
        hotelResultCont.show();
    }
}

function getBrand(hotelContentPath){
		if(hotelContentPath.indexOf('/gateway/') != -1)
			return 'Gateway';
		if(hotelContentPath.indexOf('/ginger/') != -1)
			return 'Ginger';
		if(hotelContentPath.indexOf('tajhotels') != -1 || hotelContentPath.indexOf('taj/') != -1 )
			return 'Taj';		
		if(hotelContentPath.indexOf('seleqtions') != -1)
			return 'SeleQtions';
		if(hotelContentPath.indexOf('vivanta') != -1)
			return 'Vivanta';
		if(hotelContentPath.indexOf('/ama/') != -1 || hotelContentPath.indexOf('amastaysandtrails') != -1)
			return 'Ama';
	}
	
	
	function brandWiseSplitOtherHotels(otherHotels){
		var vivantaArray = [];var tajArray = [];var seleqtionsArray = []; var amaArray = []; var gatewayArray = [];var gingerArray = [];
		var arraygroup= [];
		 if (otherHotels && Object.keys(otherHotels).length) {
                otherHotels.forEach(function(hotel) {
				if(hotel.path.indexOf('/gateway/') != -1 || (hotel.title && hotel.title.indexOf('The Gateway') != -1))
					gatewayArray.push(hotel);	
				else if(hotel.path.indexOf('ginger') != -1 || hotel.path.indexOf('/ginger/') != -1)
					gingerArray.push(hotel);
				else if(hotel.path.indexOf('tajhotels') != -1 || hotel.path.indexOf('/taj/') != -1)
					tajArray.push(hotel);
				else if(hotel.path.indexOf('vivanta') != -1 || (hotel.title && hotel.title.indexOf('Vivanta') != -1))
					vivantaArray.push(hotel);
				else if(hotel.path.indexOf('seleqtions') != -1 || (hotel.title && hotel.title.indexOf('SeleQtions') != -1))
					seleqtionsArray.push(hotel);
				else if(hotel.path.indexOf('amastays') != -1 || hotel.path.indexOf('/ama/') != -1)
					amaArray.push(hotel);
				});
		}
		if(tajArray.length>0)
			arraygroup.push({'Taj': tajArray});			
		if(seleqtionsArray.length>0)
			arraygroup.push({'SeleQtions': seleqtionsArray});		
		if(vivantaArray.length>0)
			arraygroup.push({'Vivanta': vivantaArray});
		if(gingerArray.length>0)
			arraygroup.push({'Ginger': gingerArray});
		if(gatewayArray.length>0)
			arraygroup.push({'Gateway': gatewayArray});
		if(amaArray.length>0)
			arraygroup.push({'Ama Stays & Trails': amaArray});

		return arraygroup;
	}
	
	
function addDestSearchResults(dests) {
    var destinationObject = [];
    if (Object.keys(dests).length) {
        dests.forEach(function(dest) {
            var destRedirectPath = dest.path;
            console.log(dest);
            if (isIHCLCBSite() && dest && dest.ihclOurHotelsBrand) {
                if (dest.path.includes('/corporate-booking/')) {
                    var destinationFlag = false;
                    for (var i = 0; i < destinationObject.length; i++) {
                        if (destinationObject[i] === dest.path) {
                            destinationFlag = true;
                            break;
                        }
                    }
                    if (!destinationFlag) {
                        destinationObject.push(dest.path);
                        var resultHtml = createSearchResult(dest.title, destRedirectPath);
                        destResults.append(resultHtml);
                    }
                }
            } else {
                if(!(dest.path.indexOf("tajinnercircle") != -1)){
                    var resultHtml = createSearchResult(dest.title, destRedirectPath);
                destResults.append(resultHtml);
                }
                
            }
        });
        destResultCont.show();
    }
}

function addHolidaySearchResults(holidays) {
    if (Object.keys(holidays).length) {
        holidays.forEach(function(holidays) {
            if (holidays.title != null) {
                var resultHtml = createSearchResult(holidays.title, holidays.path);
                holidayResults.append(resultHtml);
            }
        });
    }
}

function addHolidayHotelSearchResults(holidayHotel) {
    if (Object.keys(holidayHotel).length) {
        holidayHotel.forEach(function(holidayHotel) {
            var resultHtml = createSearchResult(holidayHotel.title, holidayHotel.path);
            holidayHotelResults.append(resultHtml);
        });
    }
}

function createSearchResult(title, path, hotelId, sameDayCheckout) {
    /*Check if not GInger hotels*/
    if(hotelId == "99999" && window.location.href.includes('//taj-dev65-02.adobecqms.net')){
        let tajhotelsDomainURL_1 = "https:/www.tajhotels.com";
        let tajhotelsDomainURL_2 = "https://www.tajhotels.com";
        if(path.startsWith(tajhotelsDomainURL_1)){
			path = path.substr(tajhotelsDomainURL_1.length);
        }
        if(path.startsWith(tajhotelsDomainURL_2)){
			path = path.substr(tajhotelsDomainURL_2.length);
        }
    }
    if(hotelId == "99999"){
        if(path.indexOf("/en-in/swt/?redirectUrl=") == -1) {
        	path = "/en-in/swt/?redirectUrl=" + path;
        }
    }


    /*if(path.startsWith('/en-in/ginger/')) {
        var authCodeLocal = localStorage.getItem("authCode");
        var codeVerifierLocal = localStorage.getItem("codeVerifier");
        path = path + "?authCode=" +  authCodeLocal + "&codeVerifier=" + codeVerifierLocal;
    }*/
    
    return '<a class="individual-trends" data-hotelId="' + hotelId + '" data-redirect-path="' + path + '" data-sameDayCheckout="' + sameDayCheckout + '">' + title
            + '</a>';
}

$('#booking-search .trending-search').on("click", '.individual-trends', function() {
    hideSuggestionsContainer();
    if ($(this).parents('.trending-searches-in-taj').attr('id') == 'others-hotel-result') {
        domainChangeFlag = true;
    } else {
        domainChangeFlag = false;
    }
    var selectedLocation = $(this).text();
    var selectedHotelId = "";
    if ($(this).attr('data-hotelid') != 'undefined') {
        selectedHotelId = $(this).attr('data-hotelid');
    }
    dataCache.session.setData("sameDayCheckout", $(this).attr('data-sameDayCheckout'));
    setHotelIdFromSearch(selectedHotelId);
    setSearchBarText(selectedLocation);
    var reDirectPath = $(this).data("redirect-path");
    searchInput.attr('data-selected-search-value', selectedLocation);
    enableBestAvailableButton(reDirectPath);
});

function setSearchBarText(textValue) {
    return searchInput.val(textValue);

}

function setHotelIdFromSearch(hotelId) {
    $("#hotelIdFromSearch").text(hotelId);
}
}

var initiateNavPreloginSearch = function() {
var navPreloginSearch = $('.header-nav-prelogin-search');
$('.gb-search-con').click(function() {
    navPreloginSearch.show().promise().then(function() {
        navPreloginSearch.find('.searchbar-input').click();
    });
});
$('.nav-prelogin-close, .closeIconImg ,.cm-overlay').click(function() {
    navPreloginSearch.hide();
});
}

initiateNavPreloginSearch();

$('document').ready(function() {

    var spaButtons = $('.jiva-spa-details-book-btn');
    spaButtons.each(function() {
        $(this).on('click', function() {
            setSpaAndHotelDataInSession($(this));
        });
    });
    $('.events-cards-request-btn').each(function(element) {
        $(this).hide();
    });
    var requestQuote = $('.events-cards-request-btn, .meeting-request-quote-btn');
    requestQuote.each(function() {
        $(this).on('click', function() {
            setRequestQuoteDataInSession($(this));
        });
    });
    $('.meeting-card-wait-spinner').each(function(element) {
        $(this).hide();
    });
    $('.events-cards-request-btn').each(function(element) {
        $(this).show();
    });
});

function setRequestQuoteDataInSession(clickEvent) {
    var meetingRequestQuoteData = {};

    var ind = $(clickEvent).closest(".events-pg-filter-inner-wrap");

    // Hotel properties
    var requestQuoteEmailId = $(ind).find(".request-quote-email-id").text();

    meetingRequestQuoteData.requestQuoteEmailId = requestQuoteEmailId;
    dataCache.session.setData('meetingRequestQuoteData', meetingRequestQuoteData);
}

function setSpaAndHotelDataInSession(clickEvent) {
    var spaOptions = {};

    var ind = $(clickEvent).closest(".jiva-spa-card-details-wrap");
    var spaName = $(ind).find(".jiva-spa-details-heading").text();
    var spaDuration = $(ind).find(".spa-duration").text();
    var spaCurr = $(ind).find(".spaCurr").text();
    var spaAmount = $(ind).find(".spaAmount").text();
    var spaAmountDetails = spaCurr + spaAmount;

    // Hotel properties
    var hotelName = $(ind).find(".hotel-name").text();
    var hotelCity = $(ind).find(".hotel-city").text();
    var hotelEmailId = $(ind).find(".hotel-email-id").text();
    var jivaSpaEmailId = $(ind).find(".jiva-spa-email-id").text();
    var requestQuoteEmailId = $(ind).find(".request-quote-email-id").text();
    spaOptions.spaName = spaName;
    spaOptions.spaDuration = spaDuration;
    spaOptions.spaAmount = spaAmountDetails;
    spaOptions.hotelName = hotelName;
    spaOptions.hotelCity = hotelCity;
    spaOptions.hotelEmailId = hotelEmailId;
    spaOptions.jivaSpaEmailId = jivaSpaEmailId;
    spaOptions.requestQuoteEmailId = requestQuoteEmailId;
    dataCache.session.setData('spaOptions', spaOptions);
}

$(document).ready(function(){		
	modifyBookingState = dataCache.session.getData('modifyBookingState');
	var modifyBookingQuery = getQueryParameter('modifyBooking');
	if( modifyBookingQuery =="true" && modifyBookingState){		
	 	if(modifyBookingState!='modifyRoomType'){					
			$('.book-stay-btn').trigger('click');
		}		
	}else{
		console.log("Booking modification is not invoked")
	}
	if(modifyBookingState && modifyBookingState!='modifyAddRoom'){
		$('.cart-room-delete-icon, .cart-addRoom').remove();
	}
	if(modifyBookingState && modifyBookingState == 'modifyGuest'){
		updateBookedRoom();
    }
    if (window.location.href.indexOf("en-in/booking-cart") > -1 && modifyBookingState!='modifyAddRoom') {
        updateBookedRoom();
	}
	$('.carts-book-now').on('click',updateBookedRoom);
});

function updateBookedRoom(){
	if(modifyBookingState){
		var bookedRoomsModify ={};
		var modifiedBookingOptions = dataCache.session.getData('bookingOptions');
		var selection = modifiedBookingOptions.selection;
		var bookedRoomsData = modifiedBookingOptions.bookedRoomsModify;
		if(modifyBookingState == 'modifyGuest'){bookedRoomsData = modifiedBookingOptions.roomOptions;}
        var modifiedCheckInDate = moment(modifiedBookingOptions.fromDate,"MMM Do YY").format("YYYY-MM-DD");
        var modifiedCheckOutDate = moment(modifiedBookingOptions.toDate,"MMM Do YY").format("YYYY-MM-DD");
		var totalAmountAfterTax = 0;
		var totalAmountBeforeTax = 0;
		$(selection).each(function(index,data){
			var reservationNumber = bookedRoomsData[index].reservationNumber;
			var modifiedRoomData = {
				bedType: data.roomBedType,
				bookingStatus: true,
				cancellable: true,
				cancellationPolicy: "Staggered cancel policy",
				discountedNightlyRates: null,
				hotelId: data.hotelId,
				modifyRoom: false,
				nightlyRates: data.nightlyRates,
				noOfAdults: parseInt(data.adults),
				noOfChilds: parseInt(data.children),
				petPolicy: null,
				promoCode: null,
				rateDescription: data.rateDescription,
				ratePlanCode: data.ratePlanCode,
				resStatus: "Committed",
				reservationNumber: reservationNumber,
				roomCostAfterTax: data.roomTaxRate + data.roomBaseRate,
				roomCostBeforeTax: data.roomBaseRate,
				roomTypeCode: data.roomTypeCode,
				roomTypeDesc: "",
				roomTypeName: data.title
			}	
			bookedRoomsModify[reservationNumber] = modifiedRoomData;			
		});
		var bookingDetailsResponse = JSON.parse(dataCache.session.getData('bookingDetailsRequest'));
		bookingDetailsResponse.checkInDate = modifiedCheckInDate;
		bookingDetailsResponse.checkOutDate = modifiedCheckOutDate;
		var bookingRoomList = bookingDetailsResponse.roomList;
        //var roomListUpdated = bookingDetailsResponse.roomList;
        var ival = 0;
		$(bookingRoomList).each(function(index){
            index = index - ival;
			var reservationNumber = this.reservationNumber;			
			if(bookedRoomsModify[reservationNumber]){
				bookingRoomList[index] = bookedRoomsModify[reservationNumber];
			}else if(bookingRoomList[index].resStatus == 'Cancelled'){
                bookingRoomList.splice(index, 1);
                ival++;
                //--index;
			}
			
			totalAmountBeforeTax += parseFloat(this.roomCostBeforeTax);
			totalAmountAfterTax += parseFloat(this.roomCostAfterTax);
		});
		bookingDetailsResponse.roomList = bookingRoomList;
		bookingDetailsResponse.totalAmountBeforeTax = totalAmountBeforeTax;
		bookingDetailsResponse.totalAmountAfterTax = totalAmountAfterTax;
		dataCache.session.setData('bookingDetailsRequest',JSON.stringify(bookingDetailsResponse));
	}	
}
function modifyBookingInBookAStay(modifyBookingState){
	var bookedOptions = JSON.parse(dataCache.session.getData('bookingDetailsRequest'));
	var $bookingSearchContainer = $('#booking-search');
	var $basDateOccupancyPromoWrapper = $('.bas-date-container-main-wrap');
	var $basDateContainer = $('.bas-date-container-main');
	var $basOccupancyContainer = $('.bas-hotel-details-container');
	var $basPromoCodeContainer = $('.bas-specialcode-container');
    var $basDatepickerContainer = $('.bas-date-container-main');
	var $basAddRoomOption = $('.bas-add-room');
	$basAddRoomOption.addClass('bas-hide');
	$bookingSearchContainer.addClass('modify-booking-disabled-state');
    $basDatepickerContainer.addClass('modify-booking-disabled-state');
	$basDateOccupancyPromoWrapper.children().addClass('modify-booking-disabled-state');
	if(modifyBookingState == 'modifyDate'){
		$basDateContainer.removeClass('modify-booking-disabled-state');				
	}else if(modifyBookingState == 'modifyRoomOccupancy'){
		$basOccupancyContainer.removeClass('modify-booking-disabled-state');
	}else if(modifyBookingState == 'modifyAddRoom'){
		$basOccupancyContainer.removeClass('modify-booking-disabled-state');
		$basAddRoomOption.removeClass('bas-hide');
	}
}
$("document").ready(function() {
    try {
        var bungalows = getUrlParameter('onlyBungalows');
        var checkAvail = getUrlParameter('checkAvail');
        var themeAma = $('.cm-page-container').hasClass('ama-theme');
        if (themeAma) {
			/*$(".ama-theme .bas-about-room-container").css("display", "block");
			$('.cm-bas-content-con').css('height','560px');*/
            if (!bungalows && bungalows == "" && checkAvail) {
                $("#onlyRoom").trigger("click");
                $(".ama-theme .bas-about-room-container").css("display", "block");
            } else {
                $("#onlyBungalow").trigger("click");
                $(".ama-theme .bas-about-room-container").css("display", "none");
            }

            $('.ama-theme .bas-date-container-main-wrap input[type="radio"]').click(function() {

                var adultCountReset = $(".ama-theme  .bas-quantity").parent().parent().hasClass("bas-no-of-adults");
                var childCountReset = $(".ama-theme  .bas-quantity").parent().parent().hasClass("bas-no-of-child");
                if (adultCountReset) {
                    $(".ama-theme  .bas-quantity").closest(".bas-no-of-adults .bas-quantity").val(1);
                }
                if (childCountReset) {
                    $(".ama-theme  .bas-quantity").closest(".bas-no-of-child .bas-quantity").val(0);
                }
                if ($(this).hasClass("activeRadioButton")) {
                    $(".ama-theme .bas-about-room-container").css("display", "block");
                } else if (!$(this).hasClass("activeRadioButton")) {
                    $(".ama-theme .bas-about-room-container").css("display", "none");
                }

            });

            $(".ama-theme .bas-close.icon-close").click(function() {

                // if (!bungalows && bungalows == "" && checkAvail) {
                // $("#onlyRoom").trigger("click");
                // } else {
                // $("#onlyBungalow").trigger("click");
                // }

                amaBookingObject = fetchRoomOptionsSelected(amaBookingObject);
                amaBookingObject.fromDate = moment(new Date($("#input-box1").val())).format('MMM D YY');
                amaBookingObject.toDate = moment(new Date($("#input-box2").val())).format('MMM D YY');
                amaBookingObject.rooms = $('.bas-room-no').length;
                amaBookingObject.BungalowType = fetchRadioButtonSelectedAma();
                typeof autoPopulateBannerBookAStay != 'undefined' ? autoPopulateBannerBookAStay() : '';
            });
            var shouldInvokeCalendarApiBas = false;
            if(document.getElementById("shouldInvokeCalendarApiBas"))
					var shouldInvokeCalendarApiBas = document.getElementById("shouldInvokeCalendarApiBas").value;
				if(shouldInvokeCalendarApiBas){
					amacacalendarPricingBas();
					bindNextPrevClickAmaBas();
				}				
        }

        $(".ama-theme .bas-date-container-main-wrap #onlyBungalow").click(function() {
            $(".bas-room-delete-close").trigger("click");
        });

        setTimeout(updateBasPlaceholder, 1000);

        function updateBasPlaceholder() {
            var isDestinationPage = $(".cm-page-container").hasClass("destination-layout");
            var isHotelPage = $(".cm-page-container").hasClass("specific-hotels-page");
            if (themeAma & !isDestinationPage & !isHotelPage) {
                $('#book-a-stay .dropdown-input').text("Select Destinations/Bungalows");
            } else if (themeAma & (isDestinationPage || isHotelPage)) {
                var destinationName = $('.specific-hotels-breadcrumb .breadcrumb-item:last-child').text().trim();
                $('#book-a-stay .dropdown-input').text(destinationName);
                $('#global-re-direct').attr('hrefvalue', window.location.href);
            }
        }
    } catch (error) {
        console.error('Error occurred in ama-bookastay', error);
    }


    /* is only bunglow check in home page*/
	isOnlyBunglowInHome();


});


var basSelectedHotel;
var basSelectedFromdate;
var basSelectedTodate;
var ItineraryDetails;
var currentCalendarInputDate;
var monthExisting;
var monthOfferNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December", "December"];
var monthAvailability = {};  
var monthJson;

function amacacalendarPricingBas(){

    basSelectedHotel = $("#hotelIdFromSearch").text() || pageLevelData.hotelCode;

    //var isCalendarPricing = document.getElementById("isCalendarPricing").value;
    var isCalendarPricing = true;
    if( isCalendarPricing == true){

	$('.input-box-wrapper').click(function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation();
        //***Removing Ama Calendar rates modified****///
        var getPathName = window.location.pathname;
        var getHostName = window.location.hostname;
        if(getHostName == 'www.amastaysandtrails.com' || getPathName.includes('/content/ama')){
            return;
        } ///*** changes end ****///
		if($("#hotelIdFromSearch").text() == '' || basSelectedHotel == "99999"){
			return;
		}
        currentCalendarInputDate = new Date($(e.currentTarget).find('input').val());

		if(!($($(e.currentTarget).find('input')[0]).val()) && $($(e.currentTarget).find('input')[0])){
			currentCalendarInputDate = new Date();
		}
		if(!($($(e.currentTarget).find('input')[0]).val()) && $($(e.currentTarget).find('input')[0])){
			currentCalendarInputDate = moment($($(e.currentTarget).closest('.row').find('.enquiry-from-value')[0]).val(), "DD/MM/YYYY")._i;
		}

		var monthYearStr = $($($('.bas-calander-container').find('.datepicker-days')[$('.bas-calander-container').find('.datepicker-days').length-1]).find('thead .datepicker-switch')[0]).html();
		if(monthYearStr){
			var currentCalendarMonthName = monthYearStr.split(' ')[0];
			var currentCalendarYear =  monthYearStr.split(' ')[1];				
		}else{
			var currentCalendarMonthName = monthOfferNames[currentCalendarInputDate.getMonth()];
			var currentCalendarYear = currentCalendarInputDate.getFullYear();
		}
		var  currentCalendarMonthFirstDay = new Date(currentCalendarYear, monthOfferNames.indexOf(currentCalendarMonthName),1);
		var  currentCalendarMonthLastDay = new Date(currentCalendarYear, monthOfferNames.indexOf(currentCalendarMonthName) + 1, 0);

        basSelectedHotel = $("#hotelIdFromSearch").text() || pageLevelData.hotelCode;
		basSelectedFromdate = currentCalendarMonthFirstDay;
		basSelectedTodate = new Date((basSelectedFromdate.getTime() +  (60 * 24 * 60 * 60 * 1000)));
		if(!monthAvailability[basSelectedHotel]){
			monthAvailability = {};
			//basSelectedTodate = currentCalendarMonthFirstDay;
			//basSelectedFromdate = new Date((basSelectedTodate.getTime() +  (1 * 24 * 60 * 60 * 1000)));
		}
        monthAvailability = {};
        var monthJsonCheck = monthAvailability[basSelectedHotel] && monthAvailability[basSelectedHotel][currentCalendarMonthName + currentCalendarYear];

        if((!monthJsonCheck || (monthJsonCheck && new Date(monthJsonCheck[monthJsonCheck.length - 1].end) < currentCalendarMonthLastDay)) && basSelectedHotel != "99999" ){
			$('td.day').attr('data-custom', '');		
			//basSelectedFromdate = basSelectedTodate ? new Date() : new Date();
			//basSelectedTodate =  new Date((basSelectedFromdate.getTime() +  (60 * 24 * 60 * 60 * 1000)));
			var basUrl = "/bin/calendarAvailability.rates/" + basSelectedHotel + "/" +moment(basSelectedFromdate).format('YYYY-MM-DD') + "/" +
			moment(basSelectedTodate).format('YYYY-MM-DD') + '/INR/1,0/["STD"]/[]//P1N/ratesCache.json';
			console.log("check availability URL",basUrl);

			monthExisting = false;
            console.log($('.datepicker-days').find('tbody'));
            $('.datepicker-loader').remove();
			addOfferCalendarLoaderBas();
            $.ajax({
             type : "GET",
             url:   basUrl,
             contentType : "application/json"
             }).done(addPriceDetailsBas).fail().always(function() {});

			bindNextPrevClickAmaBas();

         }else{
             monthExisting = true;
             addPriceDetailsBas(monthAvailability);
		}
	return false;
	});
	}
}

function bindNextPrevClickAmaBas(){
	setTimeout(function(){ $('.datepicker .datepicker-days .next,.datepicker .datepicker-days .prev').click(function(e) {
				if($("#hotelIdFromSearch").text() == '' || basSelectedHotel == "99999"){
                	$('.datepicker-loader').remove();
					return;
				}
                setTimeout(function(){
                    console.log("e",e);
                    var currentCalendarMonthName =$($(e.target).closest('tr').find('.datepicker-switch')[0]).text().split(' ')[0];
                	var currentCalendarYear = $($(e.target).closest('tr').find('.datepicker-switch')[0]).text().split(' ')[1].substring(0,4);
                    var  currentCalendarMonthLastDay = new Date(currentCalendarYear, monthOfferNames.indexOf(currentCalendarMonthName) + 1, 0);
                    var  currentCalendarMonthFirstDay = new Date(currentCalendarYear, monthOfferNames.indexOf(currentCalendarMonthName),1);
					console.log(currentCalendarMonthName, currentCalendarYear);                    

                    var monthJsonCheck = monthAvailability[basSelectedHotel] && monthAvailability[basSelectedHotel][currentCalendarMonthName + currentCalendarYear];
                    if(!monthJsonCheck || (monthJsonCheck && new Date(monthJsonCheck[monthJsonCheck.length - 1].end) < currentCalendarMonthLastDay)){
						if(basSelectedFromdate > currentCalendarMonthLastDay){
							basSelectedFromdate = currentCalendarMonthFirstDay;
							basSelectedTodate = currentCalendarMonthLastDay
						}else{
							basSelectedFromdate = basSelectedTodate ? basSelectedTodate : new Date();
							basSelectedTodate =  new Date((basSelectedFromdate.getTime() +  (60 * 24 * 60 * 60 * 1000)));

						}

                        var basUrl = "/bin/calendarAvailability.rates/" + basSelectedHotel + "/" +moment(basSelectedFromdate).format('YYYY-MM-DD') + "/" +
						moment(basSelectedTodate).format('YYYY-MM-DD') + '/INR/1,0/["STD"]/[]//P1N/ratesCache.json';
						console.log("check availability URL",basUrl);

                        monthExisting = false;
						$('.datepicker-loader').remove();
						addOfferCalendarLoaderBas();

                        $.ajax({
                             type : "GET",
                             url : basUrl,
                             contentType : "application/json"
                             }).done(addPriceDetailsBas).fail().always(function() {});	
                    }else{
                        monthExisting = true;
                        addPriceDetailsBas(monthAvailability);
                    }
                },500);
            }); }, 500);
}

function processOfferRatesJSONBas(rateJson){	
    monthJson = monthJson ? monthJson : {};	
    monthJson[basSelectedHotel] =  monthJson[basSelectedHotel] ? monthJson[basSelectedHotel] : {};
	for(var i=0;i<rateJson.hotelStays.length;i++){
		var startmonth = new Date(rateJson.hotelStays[i].start).getMonth();
		var endmonth = new Date(rateJson.hotelStays[i].end).getMonth();
		var startYear = new Date(rateJson.hotelStays[i].start).getFullYear();
		var endYear = new Date(rateJson.hotelStays[i].end).getFullYear();
		if(!(monthJson[basSelectedHotel] && monthJson[basSelectedHotel][monthOfferNames[startmonth] + startYear]))
			monthJson[basSelectedHotel][monthOfferNames[startmonth]+startYear] = [];

		monthJson[basSelectedHotel][monthOfferNames[startmonth]+ startYear].push(rateJson.hotelStays[i]);
        //startmonth ++;
		var arrayendmonth = endmonth;
		if(endYear > startYear){
			arrayendmonth = startmonth + endmonth + 1
		}
		var thisYear = startYear; 
		while(arrayendmonth >= startmonth){			
			if(!monthJson[basSelectedHotel][monthOfferNames[startmonth] + thisYear])
				monthJson[basSelectedHotel][monthOfferNames[startmonth] + thisYear] = [];
			monthJson[basSelectedHotel][monthOfferNames[startmonth] +thisYear].push(rateJson.hotelStays[i]);
            basSelectedTodate = new Date(rateJson.hotelStays[i].end);
			startmonth ++;	
			if(endYear > startYear && startmonth == 12 ){
				startmonth = 0;
				thisYear = endYear;
				arrayendmonth = endmonth;
			}
		}
	}


	console.log("FINAL JSON", monthJson);
	return monthJson;
}

function showPricesBas(currentMonth){
		var localDateTimestamp = "";		var localDateMonth ="" ; var localDateYear = ""; let isCheckInContainer = true;
        $(".datepicker-days td").filter(function() {

				var date = $(this).text();
				return /\d/.test(date);

			}).each(function(){
            	let $currentInputElem = $(this).parents(".jiva-spa-date-section.package-input-wrp");
				if($('.bas-right-date-wrap-ama').hasClass('active') || $('.bas-right-date-wrap').hasClass('active'))
					isCheckInContainer = false;
				localDateTimestamp = new Date(new Date($(this).data('date')).toLocaleDateString('en-US')).getTime();
				localDateMonth = monthOfferNames[new Date(localDateTimestamp).getMonth()];
				localDateYear = new Date(localDateTimestamp).getFullYear();
				pricemonth = currentMonth ? currentMonth : monthAvailability[basSelectedHotel][localDateMonth + localDateYear];

            if(pricemonth){
					innerloopbas:
                    for(var i=0;i<pricemonth.length;i++){
                        if(localDateTimestamp <= new Date(pricemonth[i].end).getTime() && localDateTimestamp >= new Date(pricemonth[i].start).getTime()){
                        if(pricemonth[i].status == 'Close'){
							$(this).attr('data-custom', 'X').addClass("disabled");
                            if(!isCheckInContainer){
								$(this).removeClass("disabled");
                            }
							
                            break;
                        }
						else if(pricemonth[i].status == 'Open' || pricemonth[i].status == 'MinStay'){
                            var getPathName = window.location.pathname;
                            var getHostName = window.location.hostname;
                            if(getHostName == 'www.amastaysandtrails.com' || getPathName.includes('/content/ama')){
                                return;
                            }
							var priceStartDate, priceEndDate, price;
							for(var j=0;j<pricemonth[i].prices.length;j++){
							var priceItem = pricemonth[i].prices[j];
							priceStartDate = new Date(priceItem.start).getTime(); 
							priceEndDate = new Date(priceItem.end).getTime(); 
							var pricevals = ((parseInt(priceItem.amountBeforeTax)/1000)+'').split('.');
							var decimal= pricevals[1] ? '.' + pricevals[1].substring(0,1) : '';
							if(priceItem.currencyCode == 'INR')
								price = getCurrencySymbol(priceItem.currencyCode) + pricevals[0] + decimal + 'K';
							else
								price ='';
								
							$(this).attr('data-custom', '');
							if(localDateTimestamp >= priceStartDate && localDateTimestamp <= priceEndDate){									
								if($("#showPriceBas").val()){
									$(this).attr('data-custom', price);	
									  break innerloopbas; 
								  }								  
								  isCheckInContainer ? $(this).removeClass('disabled-checkIn') : $(this).removeClass('disabled-checkOut'); 
								}
							}
						}
                    }					
                    }
        	}
		});		
    }

function getCurrencySymbol(inputSymbol){
	if(inputSymbol == 'INR')
		return '₹';
	else if(inputSymbol == 'USD')
		return '$';
	else if(inputSymbol == 'MYR')
		return 'RM';
	else if(inputSymbol == 'ZAR')
		return 'R';
	else if(inputSymbol == 'AED')
		return 'AED';
	else if(inputSymbol == 'GBP')
		return '£';
	else if(inputSymbol == 'EUR')
		return '€';
	else 
		return inputSymbol;		
}


function addPriceDetailsBas(response) {
	$('.datepicker-loader').remove();	
	var data= response;	
	console.log('JSON response', response);	
	
	if(response.errorMessage && response.errorMessage.indexOf('Invalid Promotion Code') != -1){
		warningBox({
					title : '',
					description : 'The selected hotel is not participating in this offer.',
					callBack : null,
					needsCta : false,
					isWarning : true
			});
			return;
	}
	
	monthAvailability = monthExisting ? response : processOfferRatesJSONBas(response);	

	var monthYearStr = $($($('.bas-calander-container').find('.datepicker-days')[$('.bas-calander-container').find('.datepicker-days').length-1]).find('thead .datepicker-switch')[0]).html();
		if(monthYearStr){
			var currentCalendarMonthName = monthYearStr.split(' ')[0];
			var currentCalendarYear =  monthYearStr.split(' ')[1];				
		}else{
			var currentCalendarMonthName = monthOfferNames[currentCalendarInputDate.getMonth()];
			var currentCalendarYear = currentCalendarInputDate.getFullYear();
	}
	
	if(monthAvailability[basSelectedHotel] && monthAvailability[basSelectedHotel][currentCalendarMonthName+currentCalendarYear]){
		showPricesBas(monthAvailability[basSelectedHotel][currentCalendarMonthName+currentCalendarYear]);
	}	
}

function addOfferCalendarLoaderBas(){
    var calenderText = "Finding best rates..";
    if($("#showPriceBas").val()){
        calenderText = "Finding best rates..";
    }
    else{
        calenderText = "Checking Availability..";
    }
    $('.datepicker-days').find('tbody').append('<div  class="datepicker-loader" style="left:0px;"><p>'+calenderText+'</p></div>')
	$('.datepicker-loader').css({'width': $('.datepicker-days tbody').width() +'px', 'max-width': $('.datepicker-days tbody').width() +'px','height': $('.datepicker-days tbody').height() + 'px'});
    }

function isOnlyBunglowInHome() {
	$('#select-results').on('click', function(ev){
        if($(ev.target).parent('li').hasClass('hotel-item')){
			console.log($(ev.target).attr('data-isonlybungalow'));
            var btnElem = $("#onlyRoomBtn");
            if($(ev.target).attr('data-isonlybungalow')==="true")
            {
                $(btnElem).prop("disabled", true);
				$(btnElem).parent('.radio-container').css('opacity', '0.5');
            	$("#onlyBungalowBtn").prop("checked", true);

            }
            else
            {
                $(btnElem).prop("disabled", false);
				$(btnElem).parent('.radio-container').css('opacity', '1');
            }

        }
	});
}

$(document).ready(function() {   
	$( ".title-descriptor").each(function( index ) {
        var showMore = $($( ".title-descriptor")[index]).find('#showMoreEnabled').val();
        if(showMore == "true"){
            var charLimit = $($( ".title-descriptor")[index]).find('#hotelLongDescCharLimit').val();
            if(!charLimit || charLimit == ""){
                charLimit =  200;
            }else{
                charLimit =  parseInt(charLimit);
            }
    
            $($( ".title-descriptor")[index]).find('.description-text').cmToggleText({
                charLimit : charLimit,
                showVal : "Show More",
                hideVal : "Show Less",
            });
        }

	});	
});




/*document.addEventListener( 'DOMContentLoaded', function() {
	
	$('.placeholder-header-title').each(function() {
       $(this).cmToggleText({
           charLimit: 500,
       })
   });
	
});
*/
$( document ).ready( function() {
	/*var couponCodesList = getCouponCodeFromData();
	if(JSON.parse(couponCodesList).length == 0){
		dataCache.session.setData( "couponCodes" , JSON.parse(couponCodesList) );
	}*/
	setCouponCodeToCache();
} );

function getCouponCodeFromData() {
    var couponCodeList = $( $.find( "[data-coupon-code]" )[ 0 ] ).data();
    if ( couponCodeList ) {
        return couponCodeList.couponCode.couponCodes;
    }
    return null;
}

function setCouponCodeToCache(){
	var couponCodeList = getCouponCodeFromData();
	if(couponCodeList){
		dataCache.session.setData( "couponCodes" , couponCodeList );
	}
}

$(document).ready(function() {
	var url = window.location.href;  
	var pageName='';
	
		if(url.indexOf('dining')!= -1){
		 	pageName='Dining';
		}else if(url.indexOf('about')!= -1){
			 pageName='About';
		}else if(url.indexOf('experiences')!= -1){ 
		 	pageName='Experiences';
		}else{
			pageName='Hotels';
		}
	
	$('nav .tab-child-container').each(function(i) {
		$(this).removeClass("selected");
	});
	
	$('nav .tab-child-container').each(function(i) {
		if($(this).html() === pageName){
			$(this).addClass("selected");
		}
	});
});
document.addEventListener( 'DOMContentLoaded', function() {
    var options = {};
    var $sortHotelByFilter = $( '#sortByHotelFilter' );
    var dropDowns = {
        sortByHotel: {
            options: ['Popularity', 'Price', 'Rating' ],
            elem: $sortHotelByFilter,
            default: null,
            selected: '',
            dependent: {
                elem: null
            }
        }
    };

    initDropdown.prototype.initialize = function() {
        var itrLength = this.options.length;
        for ( i = 0; i < itrLength; i++ ) {
            this.targetElem.append( '<option>' + this.options[ i ] + '</option>' )
        };

        //Initializes selectboxit on the rendered dropdown
        this.targetElem.selectBoxIt();

        // Add listeners to each selectbox change
        this.listenDDChange();
    };

    initDropdown.prototype.listenDDChange = function() {
        var dTarget = this.targetBlock;
        dTarget.elem.change( function() {
            var selectedOption = ( dTarget.elem ).find( "option:selected" );
            dTarget.selected = selectedOption.text();
            if ( dTarget.dependent.elem ) {
                dTarget.dependent.elem.selectBoxIt( 'selectOption', 0 );
                if ( dTarget.selected != dTarget.default ) {
                    dTarget.dependent.elem.prop( "disabled", false );
                } else {
                    dTarget.dependent.elem.prop( "disabled", true );
                }
            } else {
                if ( dTarget.selected != dTarget.default ) {
                    // "dropDowns" Gives the selected values for each dropdown options
                }
            }
        } );
    };


    function initSortHotels() {

        var sortHotelsBy = new initDropdown( $sortHotelByFilter, dropDowns.sortByHotel );
        sortHotelsBy.initialize();
    };

    initSortHotels();
    $('.mr-mapView-layout').hide();

	$( '.mr-list-switch' ).on( 'click', function() {
	    $( '.mr-list-switch' ).addClass( 'mr-view-toggler-style ' );
	    $( '.mr-map-switch' ).removeClass( 'mr-view-toggler-style ' );
	    $( '.mr-listView-layout' ).show();
	    $( '.mr-mapView-layout' ).hide();
	} );
	
	$( '.mr-map-switch' ).on( 'click', function() {
	    $( '.mr-map-switch' ).addClass( 'mr-view-toggler-style ' );
	    $( '.mr-list-switch' ).removeClass( 'mr-view-toggler-style ' );
	    $( '.mr-listView-layout' ).hide();
	    $( '.mr-mapView-layout' ).show();
	});
});


$(document).ready(function() {
  var hotelData = {};
  $.ajax({
    url: "/etc/tajhotels/in/en/our-hotels/mumbai.infinity.json",
    cache: false,
    success: function(data) {
      $("div[id^=fullHotelCard]").each(function() {
        hotelData.id = this.id;
        hotelData.name = $("#" + hotelData.id).find('.mr-list-hotel-title').html().trim();
        $.each(data, function(index, element) {
          if (element.name === hotelData.name) {
            $("#" + hotelData.id).find('.current-rate').html(element.averagePrice);
            $("#" + hotelData.id).find('.discounted-rate').html(element.higestPrice);

          }
        });
      });

      $("div[id^=hotelcard]").each(function() {
        hotelData.id = this.id;
        hotelData.name = $("#" + hotelData.id).find('.mapHotel-title').html().trim();
        $.each(data, function(index, element) {
          if (element.name === hotelData.name) {
            $("#" + hotelData.id).find('.current-rate').html(element.averagePrice);
            $("#" + hotelData.id).find('.discounted-rate').html(element.higestPrice);

          }
        });
      });

      $("div[id^=carouselHotelcard]").each(function() {
        hotelData.id = this.id;
        hotelData.name = $("#" + hotelData.id).find('.hotelDetailsHeading').html().trim();
        $.each(data, function(index, element) {
          if (element.name === hotelData.name) {
            $("#" + hotelData.id).find('.current-rate').html(element.averagePrice);
            $("#" + hotelData.id).find('.discounted-rate').html(element.higestPrice);

          }
        });
      });
    }
  });
});

var listContainer;
var mapConatiner;
var mobileCardContainer;

var allListCards;
var allMobileCards;
var allMapCards;

var isDestinationLandingPage = false;
var initialCardLoad = 10;
var showMoreCardOffset = 2;
var isAmaPropertyInOtherDomain = $('#isAmaPropertyInOtherDomain').val();

window.addEventListener('load', function() {
    var showMoreCardOffsetCount = $('[data-show-more-card-offset]').data('showMoreCardOffset');
    var initialCardLoadCount = $('[data-initial-card-load]').data('initialCardLoad');

    if (showMoreCardOffsetCount) {
        showMoreCardOffset = showMoreCardOffsetCount;
    }
    if (initialCardLoadCount) {
        initialCardLoad = initialCardLoadCount;
    }
    $('.room-rate-unavailable').hide();
    $('.mapHotels-rate').hide();
    $('.map-carousal-rate').hide();
    if ($('.cm-page-container').hasClass('ama-theme')) {
        invokeRoomFetchAjaxCall();
    } else {
        invokeRateFetcherAjaxCall();

        $('.mr-list-current-discounted-rates-wrap').hide();
    }
    listContainer = $('.mr-listsMapHotels-Main-Wrapper-others .mr-lists-view-hotels-Container');
    mapConatiner = $('.mr-listsMapHotels-Main-Wrapper .mr-map-view-hotels-Container');
    mobileCardContainer = $('.carousel-inner.card-carousel.mr-mapView-card-carousel');
    listContainer.parent().showMore(showMoreCardOffset, initialCardLoad);
    if (templateName == "tajhotels/components/structure/destination-landing-page") {
        isDestinationLandingPage = true;
    }
});

function invokeRoomFetchAjaxCall() {
    $('.waiting-spinner').hide();
    $('.room-rates-wrap.static-rates').show();
    var param = window.location.search;
    if (param) {
        var arr = param.split('?');
        var query = arr[1];
        if (query.includes('checkAvail')) {
            $('.waiting-spinner').show();
            $('.room-rates-wrap.static-rates').hide();
            var requestData = {};
            var cacheText = JSON.stringify(dataCache.session.getData("bookingOptions"));
            var cacheJSONData = JSON.parse(cacheText);
            var checkInDate = fromDate(cacheJSONData.fromDate);
            var checkOutDate = toDate(cacheJSONData.toDate);
            var rooms = cacheJSONData.rooms;

            var rateFilters = [ "STD" ];
            var rateCodes = [];
           //var hotelCode = $(".mr-lists-view-hotels-Container .list-view-wrapper").attr('data-hotelid');
            var hotelCode = [];
            $(".mr-lists-view-hotels-Container .list-view-wrapper").each(function() { hotelCode.push($(this).attr("data-hotelid") ) } );

            var shortCurrencyStringInDisplay = 'NAN';

            trigger_hotelSearch(getBookingOptionsSessionData());
            console.info('Attempting to invoke ajax call with data. ');

            ROOM_OCCUPANCY_RESPONSE = {};
            $.ajax({
                type : 'GET',
                url : '/bin/room-rates/rooms-availability.rates/' + JSON.stringify(hotelCode) + '/' + checkInDate + '/' + checkOutDate
                        + '/' + shortCurrencyStringInDisplay + '/' + rooms + '/' + JSON.stringify(rateFilters) + '/'
                        + JSON.stringify(rateCodes) + '/ratesCache',
                dataType : 'json',
                data : requestData,
                error : handleFailureToFetchRates,
                success : successHandler
            });
        }
    }
}

function invokeAmaInOtherDomainFetchAjaxCall() {
    try {
        $('.waiting-spinner').hide();
        $('.room-rates-wrap.static-rates').show();

        $('.waiting-spinner').show();
        $('.room-rates-wrap.static-rates').hide();
        var requestData = {};
        var cacheText = JSON.stringify(dataCache.session.getData("bookingOptions"));
        var cacheJSONData = JSON.parse(cacheText);
        var checkInDate = fromDate(cacheJSONData.fromDate);
        var checkOutDate = toDate(cacheJSONData.toDate);
        var rooms = cacheJSONData.rooms;

        var rateFilters = [ "STD" ];
        var rateCodes = [];
        var hotel = $('.row.mr-listView-layout-row').next().find('.mr--typehotel')

        var hotelCode = [];
        hotel.each(function() {
            hotelCode.push($(this).data('hotelid'));
        });
        hotelCode = jQuery.unique(hotelCode.sort(function(a, b) {
            return a - b;
        }));
        var shortCurrencyStringInDisplay = 'NAN';

        trigger_hotelSearch(getBookingOptionsSessionData());
        console.info('Attempting to invoke ajax call with data. ');

        ROOM_OCCUPANCY_RESPONSE = {};
        $.each(hotelCode, function(index, value) {
            $.ajax({
                type : 'GET',
                url : '/bin/room-rates/rooms-availability.rates/' + value + '/' + checkInDate + '/' + checkOutDate
                        + '/' + shortCurrencyStringInDisplay + '/' + rooms + '/' + JSON.stringify(rateFilters) + '/'
                        + JSON.stringify(rateCodes) + '/ratesCache',
                dataType : 'json',
                data : requestData,
                error : handleFailureToFetchRates,
                success : successAmaInOtherDomainHandler

            });
        });
    } catch (err) {
        console.log('caught exception inside invokeAmaInOtherDomainFetchAjaxCall in destination-landing js');
        console.log(err);
    }

}

function successAmaInOtherDomainHandler(response, isError) {
    var $responseHotelCodes = response[1].rateFilters.STD;
    var $hotelElems = $('.mr-lists-view-hotels-Container .mr--typehotel');
    var $hotelMapElems = $('.mr-map-view-hotelsLists-wrap.mr--typehotel');
    $hotelElems.each(function() {
        var structureHotelElem = $(this);
        // var structureHotelMapElem = $(this);
        $.each($responseHotelCodes, function(key, value) {
            var responseHotelElem = $(this);
            if (structureHotelElem[0].dataset.hotelid == responseHotelElem[0].hotelCode) {
                var $roomsAvailabilityElems = responseHotelElem[0].roomsAvailability;
                $.each($roomsAvailabilityElems, function(key, value) {
                    if (key == structureHotelElem[0].dataset.hotelroomcode) {
                        var roomPrice = $(this)[0].lowestPrice;
						if(roomPrice){
							roomPrice =  parseInt(roomPrice) + '';
						}
                        structureHotelElem.find('.mr-list-current-discounted-rates-wrap').css('display', 'block');
                        structureHotelElem.find('.waiting-spinner.waiting-spinner-destination-cards').css('display',
                                'none');
                        structureHotelElem.find('.mr-list-current-discounted-rates-wrap').html(
                                '<div class="room-rates-wrap"><span class="mr-rupee-list-hotel">₹</span><span class="current-rate-ama">'
                                        + roomPrice + '<span class="current-rate-asterisk">*</span></span></div>');
                        structureHotelElem.attr("data-price", roomPrice);
                    }

                })
                structureHotelElem.find('.waiting-spinner.waiting-spinner-destination-cards').css('display', 'none');

            }
        });
    })

    $hotelMapElems.each(function() {
        var structureHotelMapElem = $(this);
        $.each($responseHotelCodes, function(key, value) {
            var responseHotelElem = $(this);
            if (structureHotelMapElem[0].dataset.hotelid == responseHotelElem[0].hotelCode) {
                var $roomsAvailabilityElems = responseHotelElem[0].roomsAvailability;
                $.each($roomsAvailabilityElems, function(key, value) {
                    if (key == structureHotelMapElem[0].dataset.hotelroomcode) {
                        var roomPrice = $(this)[0].lowestPrice;
						if(roomPrice){
							roomPrice =  parseInt(roomPrice) + '';
						}
                        structureHotelMapElem.attr("data-price", roomPrice);
                        structureHotelMapElem.find('.map-card-current-rate').html(roomPrice);
                    }

                })

            }
        });
    })

    $('.waiting-spinner').hide();

    console.info('Ajax call for servlet succeeded');
}
function fromDate(fromDate) {
    var checkInDate = moment(fromDate, 'MMM Do YY').format('YYYY-MM-DD');
    return checkInDate
}

function toDate(toDate) {
    var checkOutDate = moment(toDate, 'MMM Do YY').format('YYYY-MM-DD');
    return checkOutDate
}

function successHandler(response, isError) {
    var $responseHotelCodes = response;
    var $hotelElems = $('.mr-lists-view-hotels-Container .mr--typehotel');
    var amaTheme = $('div').hasClass('ama-theme');
   $hotelElems.each(function(index) {
                var structureHotelElem = $(this);
               //Added this line
                                var $responseHotelCodes = response[index+1].rateFilters.STD;

               				 $.each(
                                $responseHotelCodes,
                                function(key, value) {
                                    var responseHotelElem = $(this);
                                    if (structureHotelElem[0].dataset.hotelid == responseHotelElem[0].hotelCode) {
                                        var $roomsAvailabilityElems = responseHotelElem[0].roomsAvailability;
                                        $
                                                .each(
                                                        $roomsAvailabilityElems,
                                                        function(key, value) {
                                                            if (key == structureHotelElem[0].dataset.hotelroomcode) {
                                                                var roomPrice = $(this)[0].lowestPrice;
																if(roomPrice){
																	roomPrice =  parseInt(roomPrice) + '';
																}
                                                                structureHotelElem.find(
                                                                        '.mr-list-current-discounted-rates-wrap').css(
                                                                        'display', 'block');
                                                                structureHotelElem
                                                                        .find(
                                                                                '.waiting-spinner.waiting-spinner-destination-cards')
                                                                        .css('display', 'none');
                                                                structureHotelElem
                                                                        .find('.mr-list-current-discounted-rates-wrap')
                                                                        .html(
                                                                                '<div class="room-rates-wrap"><span class="mr-rupee-list-hotel ama-rupee-symbol">₹</span> '
                                                                                        + roomPrice
                                                                                        + '<span class="room-rate-per-night-text"> Per Night</span></div>');
                                                                structureHotelElem.attr("data-price", roomPrice);
                                                            }

                                                        })
                                        var loadingSpinner = structureHotelElem.find('.waiting-spinner').css('display');
                                        if (amaTheme && loadingSpinner == 'block') {
                                            structureHotelElem.find('.card-wrapper').addClass('soldOut')
                                            structureHotelElem
                                                    .find('.card-wrapper-descritpion')
                                                    .prepend(
                                                            "<div class='soldOut-text'>Please check for alternate dates and occupancy combinations.</div>")
                                            structureHotelElem.find('.mr-list-current-discounted-rates-wrap').css(
                                                    'display', 'block');
                                            structureHotelElem.find(
                                                    '.waiting-spinner.waiting-spinner-destination-cards').css(
                                                    'display', 'none');
                                            structureHotelElem.find('.mr-list-current-discounted-rates-wrap').html(
                                                    '<div class="room-rates-wrap"><span> Sold Out</span></div>');
                                        }
                                    }
                                });
            })
    // Analytics Data Call For AMA
    if (amaTheme) {
        var availHotelCount = '';
        var HotelList = [];
        var hotelsList = $('.mr-lists-view-hotels-Container .list-view-wrapper');
        $.each(hotelsList, function(index, value) {
            var hotelCardObj = {}
            try {
                hotelCardObj.Price = $(this).find(".room-rates-wrap").text().match(/\d+/)[0];
                availHotelCount++;
            } catch (e) {
            }
            HotelList.push(hotelCardObj);
        });
        try {
            amaDestinationLayerData.AvailHotels = availHotelCount;
            amaDestinationLayerData.HotelList.forEach(function(index, item) {
                index.Price = HotelList[item]["Price"];

            });
        } catch (e) {
        }
    }
    console.info('Ajax call for servlet succeeded');
}
function handleFailureToFetchRates(response) {
    console.error("Ajax call was successful, but the server returned a failure for room rates.");
}
function getCardsAfterAjax() {
    allMobileCards = mobileCardContainer.find('.mr-mapCarousel').clone(true);
    allMapCards = mapConatiner.find('.mr-map-view-hotelsLists-wrap').clone(true);
    allListCards = listContainer.find('.list-view-wrapper').clone(true);

}

$(document).on('currency:changed', function(e, currency) {
    var popupParams = {
        title : 'Booking Alert!',
        description : 'Showing currency is Hotel Default currency. Now You will not be  allowed to change Currency. ',
    }
    warningBox(popupParams);
});

function invokeRateFetcherAjaxCall() {

    var hotelID = [];
    $('[data-hotelid]').each(function() {
        hotelID.push($(this).attr("data-hotelid"));
    })

    var cacheText = JSON.stringify(dataCache.session.getData("bookingOptions"));
    if(!cacheText){
     return;}
    var cacheJSONData = JSON.parse(cacheText);
    var checkInDate = cacheJSONData.fromDate;
    var checkOutDate = cacheJSONData.toDate;
    var rooms = cacheJSONData.rooms;
    var selectionCount = cacheJSONData.selectionCount;
    var roomCount = cacheJSONData.roomCount;
    var selection = (cacheJSONData.selection.length <= 0) ? cacheJSONData.roomOptions : cacheJSONData.selection;
    var hotelId = cacheJSONData.hotelCode;
    var roomDetails = [];

    roomDetails.push(selection[0].adults);
    roomDetails.push(selection[0].children)

    checkInDate = moment(checkInDate, "MMM Do YY").format("YYYY-MM-DD");
    checkOutDate = moment(checkOutDate, "MMM Do YY").format("YYYY-MM-DD");
    var websiteId = $('#siteId').val();
    var destinationTag = $('#destinationTag').val();
    while (destinationTag && destinationTag.includes('/')) {
        destinationTag = destinationTag.replace('/', '+')
    }
    // [IHCl_CB START]
    var rateFilter = "";
    var corporateCode = "";
    var ihclCbUserDetails = dataCache.local.getData("userDetails");
    if (ihclCbUserDetails && (ihclCbUserDetails.selectedEntity || ihclCbUserDetails.selectedEntityAgent)) {
        if (ihclCbUserDetails.selectedEntity && ihclCbUserDetails.selectedEntity.partyNumber) {
            corporateCode = ihclCbUserDetails.selectedEntity.partyNumber;
        } else {
            corporateCode = ihclCbUserDetails.selectedEntityAgent.partyNumber;
        }
    } else {
        rateFilter = "STD";
    }
    // [IHCl_CB END]

    if ($('#synxis-downtime-check').val() == "true") {
        $('.waiting-spinner-destination-cards').hide();
        $('.mr-map-rating-wrap').hide();
        $(".map-last-few-rooms").hide();
        $('.waiting-spinner').hide();
        $('.map-carousel-waiting-spinner').hide();
        $('.map-card-waiting-spinner').hide();
        $(".mr-starting-rate").html("");
    } else {
        $.ajax({
            type : 'GET',
            url : '/bin/hotel-rates/destination-hotel-rates.rates/' + websiteId + '/' + destinationTag + '/'
                    + checkInDate + '/' + checkOutDate + '/' + roomDetails + '/' + rateFilter + '/' + corporateCode
                    + '/destinationRatesCache',
            dataType : 'json',
            data : "",
            success : function(response) {
                var successResponse = JSON.stringify(response.responseCode);
                var successMessage = successResponse.substring(1, successResponse.length - 1);
                if (successMessage == "SUCCESS") {
                    // var hotelDetailsList = response.hotelDetails;
                    $(".mr-starting-rate").html("Rates Currently Not Available");
                    setRatesForHotel(response);
                    getCardsAfterAjax();
                    setUpSessionData();
                    pushEvent("hotels", "hotellist", prepareGlobalHotelListJS());
                	$('.waiting-spinner').hide();
                } else {
                    $('.waiting-spinner').hide();
                    $('.map-carousel-waiting-spinner').hide();
                    $('.map-card-waiting-spinner').hide();
                    $(".mr-starting-rate").html("Rates Currently Not Available");
                    var warningPopupParams = {
                        title : 'Availability Failed!',
                        description : response.message,
                    }
                    warningBox(warningPopupParams);
                }
            },
            error : function(error) {
                console.log("Failed to get rate for availability" + error)
                pushEvent("hotels_price_unavailable", "hotels_price_unavailable", prepareGlobalHotelListJS())
                $('.waiting-spinner-destination-cards').hide();
                $('.mr-map-rating-wrap').hide();
                $(".map-last-few-rooms").hide();
                $('.waiting-spinner').hide();
                $('.map-carousel-waiting-spinner').hide();
                $('.map-card-waiting-spinner').hide();
                $(".mr-starting-rate").html("Rates Currently Not Available");
                if (error && error.status == 412 && error.responseText) {
                    var warningPopupParams = {
                        title : 'Availability Failed!',
                        description : error.responseText,
                    }
                    warningBox(warningPopupParams);
                }
                setUpSessionData();
            },
            complete : function() {
                if (isAmaPropertyInOtherDomain) {
                    invokeAmaInOtherDomainFetchAjaxCall();
                }
            }

        });
    }
}

var curCheck;

function setRatesForHotel(response) {

    var currencyData;
    var check = true;
    hotelDetailsList = JSON.parse(response.hotelDetails);
    for (i = 0; i < hotelDetailsList.length; i++) {
        currencyData = hotelDetailsList[i].currencyCode;
        if (currencyData && currencyData.currencyString && check) {
            curCheck = setActiveCurrencyWithResponseValue(currencyData.currencyString);
            check = false;
        }
        enablePriceViewforRoomsWithRate(hotelDetailsList[i]);
        enablePriceViewforRoomsWithRateMapCard(hotelDetailsList[i]);
        enablePriceViewforMapCarouselCard(hotelDetailsList[i]);
    }

    $('.waiting-spinner').hide();
    $('.map-carousel-waiting-spinner').hide();
    $('.map-card-waiting-spinner').hide();
}

function enablePriceViewforRoomsWithRate(hotelDetail) {

    // TIC FLOW
    var userDetails = getUserData();

    var cachecCurrency;
    if (curCheck) {
        cachecCurrency = getCurrencyCache().currencySymbol.trim();
    } else if (hotelDetail && hotelDetail.currencyCode) {
        cachecCurrency = hotelDetail.currencyCode.currencyString;
    }
    var currentHotelRef = $("[data-hotelid='" + hotelDetail.hotelCode + "']");
    var hotelDetailsRate = currentHotelRef.find(".mr-starting-rate");
    var bookingButtonContainer = currentHotelRef.find(".mr-list-current-discounted-rates-wrap");
    var currentRate = bookingButtonContainer.find(".current-rate");
    var currentSymbol = bookingButtonContainer.find(".mr-rupee-list-hotel");
    var currentNotAvailWrap = bookingButtonContainer.siblings('.mr-rates-not-available-wrap');
    var priceNotAvailable = currentHotelRef.find(".room-rate-unavailable");
    var lowestPrice = hotelDetail.lowestPrice;
    var discountedPrice = hotelDetail.lowestDiscountedPrice;
    bookingButtonContainer.show();
    currentNotAvailWrap.hide();
    hotelDetailsRate.html("Starting Rate/Night");
    priceNotAvailable.hide();
    currentSymbol.html(cachecCurrency);

    if (lowestPrice == 0) {
        priceNotAvailable.show();
        bookingButtonContainer.find('.mr-list-hotels-delrate').hide();
        bookingButtonContainer.find('.mr-current-rate-list').hide();
        bookingButtonContainer.find('.mr-current-tic-epicure').hide();
        hotelDetailsRate.hide();
    } else if (discountedPrice == 0 || lowestPrice == discountedPrice) {
        if (userDetails && userDetails.card && userDetails.card.tier
                && dataCache.session.getData("bookingOptions").isTicRoomRedemptionFlow) {
            bookingButtonContainer.find('.mr-current-rate-list').hide();
            bookingButtonContainer.find('.mr-current-tic-epicure').hide();
            bookingButtonContainer.find('.mr-list-hotels-delrate').hide();
            var currentRateList = bookingButtonContainer.find('.mr-current-tic-epicure');
            currentRateList.find('.tic-points').html(Math.ceil(lowestPrice));
            currentRateList.find('.epicure-points').html(Math.ceil(lowestPrice / 2));
        } else {
            currentRate.html(getCommaFormattedNumber(lowestPrice));
            bookingButtonContainer.find('.mr-list-hotels-delrate').hide();
            bookingButtonContainer.find('.mr-current-tic-epicure').hide();
            currentHotelRef.attr("data-price", lowestPrice);
        }
    } 
    else if(discountedPrice < lowestPrice) {
        currentRate.html(getCommaFormattedNumber(discountedPrice));
        bookingButtonContainer.find('.mr-current-tic-epicure').hide();
        discountedRoomRef = bookingButtonContainer.find(".discounted-rate");
        bookingButtonContainer.find(".discounted-rate").html(cachecCurrency);
        discountedRoomRef.html(lowestPrice);
        currentHotelRef.attr("data-price", lowestPrice);
    }
    else {
        currentRate.html(getCommaFormattedNumber(lowestPrice));
        bookingButtonContainer.find('.mr-current-tic-epicure').hide();
        discountedRoomRef = bookingButtonContainer.find(".discounted-rate");
        bookingButtonContainer.find('.mr-list-hotels-delrate').hide();
        bookingButtonContainer.find(".discounted-rate").html(cachecCurrency);
        discountedRoomRef.html(discountedPrice).hide();
        currentHotelRef.attr("data-price", lowestPrice);
    }

}

function enablePriceViewforRoomsWithRateMapCard(hotelDetail) {
    var cacheCurrencyData;
    if (curCheck) {
        cacheCurrencyData = getCurrencyCache().currencySymbol.trim();
    } else if (hotelDetail && hotelDetail.currencyCode) {
        cacheCurrencyData = hotelDetail.currencyCode.currencyString;
    }
    var mr_map_view_hotels_Container = $(".mr-map-view-hotels-Container");
    var currentHotelRef = mr_map_view_hotels_Container.find("[data-hotelid='" + hotelDetail.hotelCode + "']");
    var hotelDetailsRate = currentHotelRef.find(".mapHotels-rateperNightText");
    var bookingButtonContainer = currentHotelRef.find(".mapHotels-rate");
    var currentRate = bookingButtonContainer.find(".map-card-current-rate");
    var currencySybol = bookingButtonContainer.find(".newRate-rupee");
    var currentNotAvailWrap = bookingButtonContainer.siblings('.mr-rates-not-available-wrap');
    var lowestPrice = hotelDetail.lowestPrice;
    var discountedPrice = hotelDetail.lowestDiscountedPrice;
    bookingButtonContainer.show();
    currentNotAvailWrap.hide();
    hotelDetailsRate.html("Starting Rate/Night");
    currencySybol.html(cacheCurrencyData);
    bookingButtonContainer.find(".mr-mapRupee").html(cacheCurrencyData);

    if (lowestPrice == 0) {
        hotelDetailsRate.hide();
        bookingButtonContainer.find(".mr-map-Newrate").hide();
        bookingButtonContainer.find(".mapHotels-oldRate").hide()
    } else if (discountedPrice == 0 || lowestPrice == discountedPrice) {
        currentRate.html(getCommaFormattedNumber(lowestPrice));
        bookingButtonContainer.find('.mapHotels-oldRate').hide();
    } else {
        currentRate.html(getCommaFormattedNumber(discountedPrice));
        discountedRoomRef = bookingButtonContainer.find(".map-card-discounted-rate");
        discountedRoomRef.html(discountedPrice);
    }

}

function enablePriceViewforMapCarouselCard(hotelDetail) {
    var cacheCurrencyData;
    if (curCheck) {
        cacheCurrencyData = getCurrencyCache().currencySymbol.trim();
    } else if (hotelDetail && hotelDetail.currencyCode) {
        cacheCurrencyData = hotelDetail.currencyCode.currencyString;
    }
    var mr_mapView_card_carousel = $(".mr-mapView-card-carousel");
    var currentHotelRef = mr_mapView_card_carousel.find("[data-hotelid='" + hotelDetail.hotelCode + "']");
    var hotelDetailsRate = currentHotelRef.find(".hotelDetailsRate");
    var map_carousal_rate = currentHotelRef.find(".map-carousal-rate");
    var bookingButtonContainer = currentHotelRef.find(".bookingButtonContainer");
    var currentRate = bookingButtonContainer.find(".current-rate");
    var currencySybol = bookingButtonContainer.find(".rate-currency-symbol");
    var priceNotAvailable = bookingButtonContainer.find(".room-rate-unavailable");

    var lowestPrice = hotelDetail.lowestTotalPrice;
    var discountedPrice = hotelDetail.lowestDiscountedPrice;
    bookingButtonContainer.show();
    map_carousal_rate.show();
    // hotelDetailsRate.html("Starting Rate/Night");
    currencySybol.html(cacheCurrencyData);
    // bookingButtonContainer.find(".mr-mapRupee").html(cacheCurrencyData);
    if (lowestPrice == 0) {
        priceNotAvailable.show();
        bookingButtonContainer.find('.mr-list-hotels-delrate').hide();
        bookingButtonContainer.find('.mr-current-rate-list').hide();
        bookingButtonContainer.find('.mr-current-tic-epicure').hide();
        hotelDetailsRate.hide();
    }
    if (discountedPrice == 0) {
        currentRate.html(getCommaFormattedNumber(lowestPrice));
        bookingButtonContainer.find('.mr-list-hotels-delrate').hide();
    } else {
        currentRate.html(getCommaFormattedNumber(discountedPrice));
        discountedRoomRef = bookingButtonContainer.find(".map-card-discounted-rate");
        discountedRoomRef.html(discountedPrice);
    }

}

function getBookingOptionsSessionData() {
    return dataCache.session.getData("bookingOptions");
}

function setCurrencyInSessionStorage(currency) {
    var bookingOptions = getBookingOptionsSessionData();
    bookingOptions.currencySelected = currency;
    dataCache.session.setData("bookingOptions", bookingOptions);
}

function getCommaFormattedNumber(number) {
    var formattedNumber;
    if (isNaN(number)) {
        formattedNumber = number.toFixed();

    } else {
        formattedNumber = number.toFixed().toLocaleString('en-IN')
    }
    return formattedNumber;
}

function replaceRoomsLink(hotelsLinkArr) {
    var ROOMS_SUITES_SUFFIX = "/rooms-and-suites";
    $(hotelsLinkArr).each(function() {
        var linkExists = $(this).find(" >a").attr("href");

        console.log("Link found : ", linkExists);
        if (linkExists != "" && linkExists != undefined && linkExists != null) {
            linkExists = linkExists.replace(".html", "");
            var linkReplaced = linkExists + ROOMS_SUITES_SUFFIX + ".html";
            linkReplaced = linkReplaced.replace("//", "/");

            console.log("Link replaced : ", linkReplaced)

            $(this).find(" >a").attr("href", linkReplaced);
        }
    })
}

window.addEventListener('load', function() {
    var hotelTypeCheckBox = '';
    var selectedFiltered;
    var filterOrder;
    var hotelData = {};

    var detail = {};
    var hotelMasterDataJSON;

    var allMarkers = [];
    var markerSizeFlag = false;
    var imageList = {
        "taj": ["/etc.clientlibs/tajhotels/components/content/destination/hotels-list-wth-map/clientlibs/resources/tajMarker.png",
            "/etc.clientlibs/tajhotels/components/content/destination/hotels-list-wth-map/clientlibs/resources/tajLarge.png"
        ],
        "vivanta": ["/content/dam/tajhotels/icons/style-icons/vivanta-small.png",
            "/content/dam/tajhotels/icons/style-icons/vivanta-large.png"
        ],
        "gateway": ["/etc.clientlibs/tajhotels/components/content/destination/hotels-list-wth-map/clientlibs/resources/gatewayMarker.png",
            "/etc.clientlibs/tajhotels/components/content/destination/hotels-list-wth-map/clientlibs/resources/gatewayLarge.png"
        ],
        "seleqtions": ["/content/dam/tajhotels/icons/style-icons/seleqtions-small.png",
            "/content/dam/tajhotels/icons/style-icons/seleqtions-large.png"
        ]
    };
    var hotelType;
    hotelCardClicked = function(targetHotelCard) {

        hotelCardActivate(targetHotelCard.getAttribute('data-hotelid'));
        markerSizeChange(targetHotelCard.getAttribute('data-hotelid'));
    }

    function hotelCardActivate(hotelId) {
        if (($("#" + hotelId + ".mr-map-view-hotelsLists-wrap").hasClass("active") == false)) {

            if ($('.mr-map-view-hotelsLists-wrap.active').length > 0)
                $('.mr-map-view-hotelsLists-wrap.active').removeClass("active");
        }
        $("#" + hotelId + ".mr-map-view-hotelsLists-wrap").addClass("active");

    }

    function markerSizeChange(targetMarkerId) {

        for (var i = 0; i < allMarkers.length; i++) {
            if (allMarkers[i].hotelId == targetMarkerId) {
                if (allMarkers[i].markerSizeFlag == false) {
                    allMarkers[i].setIcon(allMarkers[i].iconFocused);

                    allMarkers[i].markerSizeFlag = true;
                }
            } else {
                allMarkers[i].setIcon(allMarkers[i].iconNormal);
                allMarkers[i].markerSizeFlag = false;
            }
        }
    }

    function createMarker(hotelData) {

        var marker;
        detail.lat = hotelData.lat;
        detail.lng = hotelData.lng;
        hotelType = hotelData.type;

        if (hotelType == "taj") {
            imagePath = imageList.taj[0];
            imagePathLarge = imageList.taj[1];

        } else if (hotelType == "vivanta") {

            imagePath = imageList.vivanta[0];
            imagePathLarge = imageList.vivanta[1];
        } else if (hotelType == "gateway") {
            imagePath = imageList.gateway[0];
            imagePathLarge = imageList.gateway[1];
        }else {
            imagePath = imageList.seleqtions[0];
            imagePathLarge = imageList.seleqtions[1];

        }

        var pinIcon = {
            url: imagePath,
            scaledSize: new google.maps.Size(46, 58),
        };

        var pinIconLarge = {
            url: imagePathLarge,
            scaledSize: new google.maps.Size(64, 84),
        }
        marker = new google.maps.Marker({
            position: detail,
            map: mapDestination,
            icon: pinIcon,
            animation: google.maps.Animation.DROP,
        });
        marker.hotelId = hotelData.id;
        marker.markerSizeFlag = markerSizeFlag;
        marker.iconNormal = pinIcon;
        marker.iconFocused = pinIconLarge;
        marker.hotelType = hotelType;

        allMarkers.push(marker);
        google.maps.event.addListener(marker, 'click', function () {
            if ((window.screen.width) < 767) {
                if (this.markerSizeFlag == false) {
                    $('.mr-mapview-carousel-wrap').show();
                    markerSizeChange(this.hotelId);
                    $('.carousel-item.mr-mapCarousel.active').removeClass('active');
                    $('#' + this.hotelId + '.carousel-item.mr-mapCarousel').addClass('active');
                }

            } else {
                markerSizeChange(this.hotelId);
                hotelCardActivate(this.hotelId);
            }
        });


    };

    function initMapDestination() {
        var latInit = parseFloat($('.mr-map-view-hotelsLists-wrap:first-child').find('.mapHotel-lat').html());
        var longInit = parseFloat($('.mr-map-view-hotelsLists-wrap:first-child').find('.mapHotel-lan').html());
        var latlng = new google.maps.LatLng(latInit, longInit);
        mapDestination = new google.maps.Map(document.getElementById('mapDestination'), {
            zoom: 11,
            minZoom: 1.5,
            center: latlng
        });


    };
    var hotelTypeClass = '';

    function afterCardsRender() {
        //to create Marker 
        $('.mr-map-view-hotelsLists-wrap').each(function() {

            hotelData.id = $(this)[0].getAttribute('data-hotelid');
            hotelData.type = $(this)[0].getAttribute('data-hotelbrand');
            hotelData.name = $(this).find('.mapHotel-title').html()
            hotelData.lat = parseFloat($(this).find('.mapHotel-lat').html());
            hotelData.lng = parseFloat($(this).find('.mapHotel-lan').html());
            createMarker(hotelData);
        });

        allMarkers[0].setIcon(allMarkers[0].iconFocused);
        allMarkers[0].markerSizeFlag = true;

        $('.carousel-item.mr-mapCarousel:first-child').addClass('active');
        $('.mr-map-view-hotelsLists-wrap:first-child').addClass('active');
    }

    //for mobile swipe functionality
    $('.mr-mapView-layout .carousel').carousel({
        interval: false
    });

    //swap functionality
    $("#mapviewCarousel").on("touchstart", function(event) {
        var xClick = event.originalEvent.touches[0].pageX;
        $(this).one("touchmove", function(event) {
            var xMove = event.originalEvent.touches[0].pageX;
            if (Math.floor(xClick - xMove) > 5) {
                $(this).carousel('next');

            } else if (Math.floor(xClick - xMove) < -5) {
                $(this).carousel('prev');

            }
            if ($('.carousel-inner.card-carousel').children().length > 1) {
                activeElemnt();
            }
        });

        $("#mapviewCarousel").on("touchend", function() {
            $(this).off("touchmove");

        });

    });


    function init() {
        initMapDestination();
        afterCardsRender();
    };

    var active = {};
    //for mobile
    function activeElemnt() {
        var hotelid = $('.carousel-inner').find('.carousel-item.active').attr('id');
        markerSizeChange(hotelid);

    }

    function updateMarker(checkedBrandList) {
        var showMarkers = [];
        for (var i = 0; i < allMarkers.length; i++) {
            if (checkedBrandList.indexOf(allMarkers[i].hotelType) > -1) {
                allMarkers[i].setVisible(true);

                showMarkers.push(allMarkers[i]);

            } else {
                allMarkers[i].setVisible(false);
            }
        }
        handleZoom(showMarkers);
    }

    function handleZoom(showMarkers) {
        var bounds = new google.maps.LatLngBounds();
        for (var i = 0; i < showMarkers.length; i++) {
            bounds.extend(showMarkers[i].getPosition());
        }
        mapDestination.fitBounds(bounds);
        if (mapDestination.getZoom() > 18) {
            mapDestination.setZoom(11);
        }
    }

    function sortBy() {

        $('#sortByHotelFilterDest').on('change', function() {
            selectedFiltered = ($(this).val()).toLowerCase();
            
            if(selectedFiltered=="all" || selectedFiltered=="price"){
            	 filterOrder = "asc";
            }
            else{
            	 filterOrder = "desc";
            }
            	  if (window.screen.width < 768) {
                      sortMeBy($('.carousel-inner.card-carousel.mr-mapView-card-carousel'), $('.carousel-item.mr-mapCarousel'), filterOrder);
                      $('.carousel-item.mr-mapCarousel.active').removeClass('active');
                      $('.carousel-item.mr-mapCarousel:first-child').addClass('active');

                  } else {

                      sortMeBy($('.mr-map-view-hotels-Container'), $('.mr-map-view-hotelsLists-wrap'), filterOrder);
                  }
                  sortMeBy($('.mr-lists-view-hotels-Container'), $('.list-view-wrapper'), filterOrder);
                  $('.mr-lists-view-hotels-Container').parent().showMore();
            
         
        })

    }

    function sortMeBy(sel, elem, order) {
        var $selector = $(sel),

            $element = $selector.children(elem);
        $selector.parent().next('.jiva-spa-show-more').remove();
        var filterVal = selectedFiltered;
        $element.sort(function(a, b) {
            var aelem = parseInt(a.getAttribute("data-" + selectedFiltered));
            var belem = parseInt(b.getAttribute("data-" + selectedFiltered));
            if (order == "asc") {
                if (aelem > belem)
                    return 1;
                if (aelem < belem)
                    return -1;
            } else if (order == "desc") {
                if (aelem < belem)
                    return 1;
                if (aelem > belem)
                    return -1;
            }
            return 0;
        });
        $element.removeAttr('style').detach().appendTo($selector);
    }


    //on click on filter 

    $('.mr-filterIconWrap .mobilefilter-wrap').on('click', function() {
        $('.mr-filter-sort-wrap.hotel-destination-page .filter-checkbox-wrapper').addClass('popup-in-mob');
    })

    $('.filter-checkbox-wrapper .filterCheckbox-backArrow').on('click', function() {

        $('.mr-filter-sort-wrap.hotel-destination-page .filter-checkbox-wrapper').toggleClass('popup-in-mob', false);
    })


    function cmnFilterFunctionality(container, cardList, checkedBrandList) {
 
        container.empty();
        cardList.each(function() {
            var dataset = $(this).data('key');
            var dataBrand = $(this)[0].getAttribute("data-hotelbrand");

            if (checkedBrandList.indexOf(dataBrand) > -1) {
                container.append($(this).removeAttr('style'));

            }
        })
        updateMarker(checkedBrandList);

    }
    
  

    function cmnFilterFunctionalityForMap(checkedBrandList) {
        $('.mr-map-view-hotelsLists-wrap.mr-map-view-mobile-none').each(function() {
            var dataBrand = $(this)[0].getAttribute("data-hotelbrand");

            if (checkedBrandList.indexOf(dataBrand) > -1) {
                $(this).toggleClass('cm-hide', false);
            } else {
                $(this).toggleClass('cm-hide', true);
            }
        })
        updateMarker(checkedBrandList);
    }

    function cmnCheckBoxFilter() {
            var checkedBrandList = []
            $('.selectSubContainer.selectcontainerSortBy select')[0].selectedIndex = 0;
            $('.selectSubContainer.selectcontainerSortBy select').data("selectBox-selectBoxIt").refresh();

            $('.mr-Filter-checkbox-wrap input.mr-filter-checkbox').each(function() {
                if ($(this).is(':checked')) {
                    checkedBrandList.push($(this).val());

                }
            })

            if (window.screen.width > 768) {

                cmnFilterFunctionalityForMap(checkedBrandList);

            } else {
                cmnFilterFunctionality(mobileCardContainer, allMobileCards, checkedBrandList);
            }
            $('.mr-listsMapHotels-Main-Wrapper').next('.jiva-spa-show-more').remove();
            cmnFilterFunctionality(listContainer, allListCards, checkedBrandList);
            listContainer.parent().showMore();

    }
  

    $('.mr-Filter-checkbox-wrap input.mr-filter-checkbox').on('change', function() {
    	cmnCheckBoxFilter();
    	
    })

    $('.map-back-icon').on('click', function() {
        $('.mr-listView-layout').show();
        $('.mr-mapView-layout').hide();
        $('.mr-map-switch').toggleClass('mr-view-toggler-style', false);
        $('.mr-list-switch').toggleClass('mr-view-toggler-style', true);
    })


    function initFilter() {
        var Data = {
            "option": ['All', 'Price'],
        };

        var $destFilter = $('#sortByHotelFilterDest');
        var dropDowns = {
            option: {
                options: Data.option,
                elem: $destFilter,
                default: 'relevant',
                selected: 'relevant',
                dependent: {}
            }

        }
        var filter = new initDropdown($destFilter, dropDowns.option);
        filter.initialize();

    }

    if (document.getElementById('mapDestination')) {
        init();
        initFilter();
        sortBy();
    }

});
function getBookingOptionsSessionDataMapCard() {
    return dataCache.session.getData("bookingOptions");
}

function setCurrencyInSessionStorageMapCard(currency) {
    var bookingOptions = getBookingOptionsSessionDataMapCard();
    bookingOptions.currencySelected = currency;
    dataCache.session.setData("bookingOptions", bookingOptions);
}

function getCommaFormattedNumberMapCard(number) {
    var formattedNumber;
    if (isNaN(number)) {
        formattedNumber = number;

    } else {
        formattedNumber = number.toLocaleString('en-IN')
    }
    return formattedNumber;
}
$(document).ready(function() {

    //Corporate page
    var button_list = document.querySelectorAll('.corporate-btn'); 
    var button_array = [...button_list];
    button_array.forEach(button => {
        button.addEventListener('click', (event) => {
          	let hotel_id = $(button).attr("data-corporatehotel-id");
            let hotel_name = $(button).attr("data-corporatehotel-name");
          	let corporate_hotel = {'hotel_id':hotel_id,'hotel_name':hotel_name};
            localStorage.setItem("corporate-hotel", JSON.stringify(corporate_hotel));
        })
    });


    var isRateRequired = $("#hide-rates").data("hide-rate-container");
    var isButtonRequired = $("#hide-button").data("hide-button-container");
    if (isRateRequired == true) {
        $('.hotelCard_hotelDetails .taj-loader.spinner_wait_con').hide();
        $('.rate_con').hide();
        //$('.hotelCard_hotelDetails .hotelDetails-name-wrap').width("90%");
    }
     if (isButtonRequired == true) {
        $('.hotelCard_hotelDetails .view-btn-con').hide();
    }
})

function onOfferDetailsHotelSelection(hotelPath, hotelId) {

    var redirectToSynXis = $("#synxis-settings").data("redirecttosynxis");
    if (redirectToSynXis == true) {
        goToSynXis(hotelId);
    } else {
        goToHotelRoomsPage(hotelPath, hotelId);

    }

}

function goToHotelRoomsPage(hotelPath, hotelId) {

    var ROOMS_PATH = "rooms-and-suites.html";
    if ($('.cm-page-container').hasClass('ama-theme') || hotelPath.includes('amastaysandtrails.com')) {
        ROOMS_PATH = "accommodations.html";
    }
    var offerRateCode = $("[data-offer-rate-code]").data("offer-rate-code");
    var comparableOfferRateCode = $("[data-offer-rate-code]").data("comparable-offer-rate-code");
    var offerTitle = $("[data-offer-rate-code]").data("offer-title");
    var noOfNights = $("[data-offer-rate-code]").data("offer-no-of-nights");
    var offerStartsFrom = $("[data-offer-rate-code]").data("offer-starts-from");

	// to check member signin in rooms and suits page
    var dataOfferCategory = $("[data-offer-rate-code]").data("offer-category");
	var memberOnlyOffer = $("[data-offer-rate-code]").data("offer-member-only");

    if((dataOfferCategory && dataOfferCategory.toLowerCase().includes('member')) || 
        (memberOnlyOffer && memberOnlyOffer == true)){
		dataCache.session.setData("memberOnlyOffer", "true");
    }


    var bookOptions = dataCache.session.getData("bookingOptions");
    var fromDate = "";
    if (bookOptions != undefined) {
        fromDate = moment(bookOptions.fromDate, "MMM Do YY");
    }
    if (offerStartsFrom) {
        var startsFrom = moment(offerStartsFrom).format('MMM Do YY');
        if (!moment(startsFrom, 'MMM Do YY').isSameOrBefore(moment(fromDate, 'MMM Do YY'))) {
            fromDate = startsFrom;
            bookOptions.fromDate = fromDate;
            var nextDate = moment(fromDate, "MMM Do YY").add(1, 'days').format("MMM Do YY");
            bookOptions.toDate = nextDate;

        }
    }
    var nights;
    if (noOfNights && noOfNights != '0') {
        nights = noOfNights;
        var toDate = moment(fromDate, "MMM Do YY").add(parseInt(nights), 'days').format("MMM Do YY");
        bookOptions.toDate = toDate;

    }
    if (bookOptions != undefined) {
        bookOptions.nights = parseInt(moment.duration(
                moment(moment(bookOptions.toDate, "MMM Do YY")).diff(moment(bookOptions.fromDate, "MMM Do YY")))
                .asDays());
    }
    dataCache.session.setData("bookingOptions", bookOptions);

    var navPath = hotelPath.replace(".html", "");
    if (hotelPath.slice(-1) === '/') {
        navPath = navPath + ROOMS_PATH;
    } else {
        navPath = navPath + '/' + ROOMS_PATH;
    }
    if (navPath != "" && navPath != null && navPath != undefined && !navPath.includes("https")) {
        navPath = navPath.replace("//", "/");
    }
    var from = moment(bookOptions.fromDate, "MMM Do YY").format('D/MM/YYYY');
    var to = moment(bookOptions.toDate, "MMM Do YY").format('D/MM/YYYY');
    if (offerRateCode) {
        if (comparableOfferRateCode) {
            offerRateCode = offerRateCode + ',' + comparableOfferRateCode;
        }
        navPath = updateQueryString("overrideSessionDates", "true", navPath);
        navPath = updateQueryString("from", from, navPath);
        navPath = updateQueryString("to", to, navPath);
        if($("#offerCodeName").text()){
        	navPath = updateQueryString($("#offerCodeName").text(), offerRateCode, navPath);
        }
        else{
			navPath = updateQueryString("offerRateCode", offerRateCode, navPath);
        }
        navPath = updateQueryString("offerTitle", offerTitle, navPath);
    }
    if(window.location.href.includes("businessConnect") && !navPath.includes('/en-in/ginger/')){
          navPath = 'https://author-taj-dev65-02.adobecqms.net/content/tajhotels/en-in/about-us/special/corporate-access.html?wcmmode=disabled'
       }


    addNavigateToHotelDataToDataLayer(hotelId, hotelPath);

    window.open(navPath, '_blank');
}

function goToSynXis(hotelId) {

    var offerRateCode = $(".offers-room-container").data("offer-rate-code");
    var synXisParamName = $("#synxis-settings").data("synxisparam");
    var startDate = $(".offers-room-container").data("offer-starts-from");
    var rooms = 1;
    var adult = 1;
    var child = 0;
    var arrive = moment(startDate).format('YYYY-MM-DD');
    var depart = moment(arrive, "YYYY-MM-DD").add(1, 'days').format("YYYY-MM-DD");
    var chain = $("#synxis-settings").data("chain");
    var currency = $("#synxis-settings").data("currency");
    var level = $("#synxis-settings").data("level");
    var locale = $("#synxis-settings").data("locale");
    var sbe_ri = $("#synxis-settings").data("sberi");
    var synXisParamValue = $("#synxis-settings").data("offercode");
    var hotel = hotelId;

    var synxisLink = "https://be.synxis.com/";

    redirectPath = synxisLink + "?adult=" + adult + "&arrive=" + arrive + "&chain=" + chain + "&child=" + child
            + "&currency=" + currency + "&depart=" + depart + "&hotel=" + hotel + "&level=" + level + "&locale="
            + locale + "&rooms=" + rooms + "&sbe_ri=" + sbe_ri;

    if (synXisParamName && synXisParamName != '') {
        if (synXisParamValue && synXisParamValue != '') {
            redirectPath = redirectPath + "&" + synXisParamName + "=" + synXisParamValue;
        }
    } else if (synXisParamValue && synXisParamValue != '') {
        redirectPath = redirectPath + "&promo=" + synXisParamValue;
    } else if (offerRateCode && offerRateCode != '') {
        redirectPath = redirectPath + "&offerRateCode=" + offerRateCode;
    }
    window.open(redirectPath, "_blank");
}


//updated for global data layer
function addNavigateToHotelDataToDataLayer(hotelId, hotelPath) {
    if(location.pathname.includes('/en-in/offers')) {
        try {
            var offerDetails = $('.offerdetails');
            var offerName = offerDetails.find('.cm-header-label').text();
            var offerCode = offerDetails.find('.offers-room-container').data('offer-rate-code');
            var offerValidity = offerDetails.find('.validity-container .validity-content').text().trim();
            var offerCategory = offerDetails.find('.offers-room-container').data('offer-category');
            var eventName = offerName.split(' ').join('') + '_ParticipatingHotels_KnowMore_OffersPage_ViewHotel';
            var offerObj = {};
            offerObj.hotelName = hotelPath.split('/')[5];
            offerObj.hotelCode = hotelId;
            offerObj.offerName = offerName;
            offerObj.offerCode = offerCode;
            offerObj.offerValidity = offerValidity;
            offerObj.offerCategory = offerCategory;
        
            addParameterToDataLayerObj(eventName, offerObj);
        }
        catch(err) {
            console.log('error in adding data to datalayer');
        }
    }
}
$( document ).ready( function() {
    trimAmenityNames();
    initDescriptionShowMore();
    $( '.mr-showMore-text-hotelsListView' ).on( 'click', function() {
        $( '.list-view-wrapper:nth-child(n+6)' ).toggle();
        if ( $( this ).text() == 'SHOW MORE' ) {
            $( this ).text( 'SHOW LESS' );
            $( '.mr-showMore-hotels-arrow-img' ).css( {
                'transform': 'rotate(' + 180 + 'deg)'
            } );
        } else {
            $( this ).text( 'SHOW MORE' );
            $( '.mr-showMore-hotels-arrow-img' ).css( {
                'transform': 'rotate(' + 180 + 'deg)'
            } );
        }
    } )
//    replaceRoomsLinkInDest()
} );

function trimAmenityNames(){
	$.each($('.destination-hotel-amenity-description'), function(i, value) {
		$(value).cmTrimText({
			charLimit : 22,
		});
	});
}

function initDescriptionShowMore() {
    $.each($('.mr-list-hotel-about>p'), function(i, value) {
        $(value).cmToggleText({
            charLimit: 125,
            showVal: 'Show More',
            hideVal: 'Show Less',
        });
    })
};
//# sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYXJrdXAvY29tcG9uZW50cy9ob3RlbHMtbGlzdC12aWV3L2hvdGVscy1saXN0LXZpZXcuanMiXSwic291cmNlc0NvbnRlbnQiOlsiJCggZG9jdW1lbnQgKS5yZWFkeSggZnVuY3Rpb24oKSB7XHJcbiAgICAkKCAnLm1yLXNob3dNb3JlLXRleHQtaG90ZWxzTGlzdFZpZXcnICkub24oICdjbGljaycsIGZ1bmN0aW9uKCkge1xyXG4gICAgICAgICQoICcubGlzdC12aWV3LXdyYXBwZXI6bnRoLWNoaWxkKG4rNiknICkudG9nZ2xlKCk7XHJcbiAgICAgICAgaWYgKCAkKCB0aGlzICkudGV4dCgpID09ICdTSE9XIE1PUkUnICkge1xyXG4gICAgICAgICAgICAkKCB0aGlzICkudGV4dCggJ1NIT1cgTEVTUycgKTtcclxuICAgICAgICAgICAgJCggJy5tci1zaG93TW9yZS1ob3RlbHMtYXJyb3ctaW1nJyApLmNzcygge1xyXG4gICAgICAgICAgICAgICAgJ3RyYW5zZm9ybSc6ICdyb3RhdGUoJyArIDE4MCArICdkZWcpJ1xyXG4gICAgICAgICAgICB9ICk7XHJcbiAgICAgICAgfSBlbHNlIHtcclxuICAgICAgICAgICAgJCggdGhpcyApLnRleHQoICdTSE9XIE1PUkUnICk7XHJcbiAgICAgICAgICAgICQoICcubXItc2hvd01vcmUtaG90ZWxzLWFycm93LWltZycgKS5jc3MoIHtcclxuICAgICAgICAgICAgICAgICd0cmFuc2Zvcm0nOiAncm90YXRlKCcgKyAxODAgKyAnZGVnKSdcclxuICAgICAgICAgICAgfSApO1xyXG4gICAgICAgIH1cclxuICAgIH0gKVxyXG59ICk7Il0sImZpbGUiOiJtYXJrdXAvY29tcG9uZW50cy9ob3RlbHMtbGlzdC12aWV3L2hvdGVscy1saXN0LXZpZXcuanMifQ==

function replaceRoomsLinkInDest(){
	var hotelsLinkArr=$(".mr-list-price-wrap .mr-list-hotel-price-tic");
	replaceRoomsLink(hotelsLinkArr)
}

$( document ).ready( function() {
    try{
    replaceRoomsLinkInDestMap();
    }catch(ep){
        //function declarations might not be available declared in hotel-list-map js
    }
});

function replaceRoomsLinkInDestMap(){
	var hotelsLinkArr2=$(".map-viewHotel-button");
	//replaceRoomsLink2(hotelsLinkArr2);
}

function replaceRoomsLink2(hotelsLinkArr){
	var ROOMS_SUITES_SUFFIX_CARD="/rooms-and-suites";
	$(hotelsLinkArr).each(function(){
        var linkExists=$(this).find(" >a").attr("href");

        console.log("Link found from carousel: ", linkExists);
        if(linkExists!="" && linkExists!== undefined && linkExists!=null){
            linkExists=linkExists.replace(".html", "");
            var  linkReplaced2=linkExists+ROOMS_SUITES_SUFFIX_CARD;
            linkReplaced2=linkReplaced2+".html";
             linkReplaced2=linkReplaced2.replace("//", "/");

            console.log("Link replaced from carousel : ", linkReplaced2)

            $(this).find(" >a").attr("href", linkReplaced2);
		}
	})
}

//[IHCL-CB START]
$(document).ready(function() {
    console.log('ready');
    $.each($(".mr-list-view-hotels-button"), function(index, value) {
        if (isIHCLCBSite()) {
            var hrefValue = $(this).parent().attr('href');
            if (hrefValue && !hrefValue.includes('rooms-and-suites')) {
                if ($(this).parents('.list-view-wrapper').data('hotelbrand') == 'taj:hotels/brands/Ama') {
                    hrefValue = hrefValue + 'accommodations/';
                } else {
                    hrefValue = hrefValue + 'rooms-and-suites/';
                }
            }

            $(this).parent().attr('href', hrefValue);
        }
    });

   	//attachAccommodation();

        /*heading handling on destiantion page*/
    if($('.hotels-in-dest-container').length && $('.mr-lists-view-hotels-Container .cm-header-label-con')){
        $('.mr-lists-view-hotels-Container .cm-header-label-con:contains(Taj Hotels in)').length > 1 ? 
            $('.mr-lists-view-hotels-Container .cm-header-label-con:contains(Taj Hotels in):not(:first-child)').remove() : '';
        	$('.mr-lists-view-hotels-Container .cm-header-label-con:contains(Ginger Hotels in)').length > 1 ? 
                 $('.mr-lists-view-hotels-Container .cm-header-label-con:contains(Ginger Hotels in):not(:first-child)').remove() : '';
            $('.mr-lists-view-hotels-Container .cm-header-label-con:contains(Gateway Hotels in)').length > 1 ? 
                 $('.mr-lists-view-hotels-Container .cm-header-label-con:contains(Gateway Hotels in):not(:first-child)').remove() : '';
    }

});


// [IHCL-CB END]

function modifyRoomsURL(element) {
    try {

        var hrefValue = $(element).attr('href');
        console.log("this is getting clicked!!"+hrefValue);
        var hrfValue2="../.."+hrefValue;
        if (hrefValue.includes("?")) {
            if (hrefValue.charAt(hrefValue.length - 1) === "?") {
                hrefValue += fetchDateOccupancyAsQueryString();
            } else {
                hrefValue += "&" + fetchDateOccupancyAsQueryString();
            }
        } else {
            hrefValue += "?" + fetchDateOccupancyAsQueryString();
        }
        $(element).attr('href', hrefValue2+"index.html");
    } catch (error) {
        console.error("Error occured while setting the dateOccupancy Combination as query string");
    }
}


/*
// fixes for villa siolim redirect ama properties to accomodation pages
function attachAccommodation() {
    console.log('attached accomodation');
    if(location.pathname.includes('/en-in/destination/') && !isIHCLCBSite()){	      
    $(".mr-list-hotel-price-tic").each(function(index, value) {
            var btnElem = $(this).find('.button-view-details');
            var hrefValue = btnElem.attr('href');
            if (hrefValue && hrefValue.includes('ama') && hrefValue.includes('rooms-and-suites')) {
            hrefValue = hrefValue.replace('rooms-and-suites', 'accommodations');
            	btnElem.attr('href', hrefValue);
            }
        });
    }
}
// fixes for villa siolim redirect ama properties to accomodation pages
*/

$(document).ready(function(){
   $('.offers-card-title').each(function(){
       $(this).cmToggleText({
           charLimit :25,
           showVal:""
       });
   });
   $('.offers-card-description').each(function(){
       $(this).cmToggleText({
           charLimit :90
       });
   });
});
function onOfferSelection(navPath, offerRateCode, offerRoundTheYear, offerTitle, noOfNights, offerStartDate,
        offerEndDate, comparableOfferRateCode, offerType) {
    try {
		// test
        // offer details functionality
        var ROOMS_PATH = "";
        var nights = '';
        var startsFrom = '';
        var endsOn = '';
        var today = moment().format('MMM Do YY');
        var tomorrow = '';
        var dayAfterTomorrow = '';
        var hotelPath = $("[data-hotel-path]").data("hotel-path");

        if ($('.cm-page-container').hasClass('ama-theme')) {
            ROOMS_PATH = "accommodations.html";
        } else {
            ROOMS_PATH = "rooms-and-suites.html";
        }

        if (noOfNights && noOfNights != "" && noOfNights != '0') {
            nights = noOfNights;
        } else {
            nights = 1;
        }
        // override default t+15 booking date for custom start and end dates and adding nights
        if (offerRateCode && !offerRoundTheYear) {
            if (comparableOfferRateCode) {
                offerRateCode = offerRateCode + ',' + comparableOfferRateCode;
            }
            if (offerStartDate && offerEndDate) {
                startsFrom = moment(offerStartDate).format('MMM Do YY');
                endsOn = moment(offerEndDate).format('MMM Do YY');
                if (moment(startsFrom, 'MMM Do YY').isSameOrBefore(moment(today, 'MMM Do YY'))
                        && moment(today, 'MMM Do YY').isSameOrBefore(moment(endsOn, 'MMM Do YY'))) {
                    tomorrow = moment().add(1, 'days').format('D/MM/YYYY');
                    dayAfterTomorrow = moment(tomorrow, "D/MM/YYYY").add(parseInt(nights), 'days').format("D/MM/YYYY");
                }
            } else if (!offerStartDate && offerEndDate) {
                endsOn = moment(offerEndDate).format('MMM Do YY');
                if (moment(today, 'MMM Do YY').isSameOrBefore(moment(endsOn, 'MMM Do YY'))) {
                    tomorrow = moment().add(1, 'days').format('D/MM/YYYY');
                    dayAfterTomorrow = moment(tomorrow, "D/MM/YYYY").add(parseInt(nights), 'days').format("D/MM/YYYY");
                }

                // default t+1 booking dates and adding nights
            } else {
                tomorrow = moment().add(1, 'days').format('D/MM/YYYY');
                dayAfterTomorrow = moment(tomorrow, "D/MM/YYYY").add(parseInt(nights), 'days').format('D/MM/YYYY');
            }

            // round the year offer with t+1 dates and nights
        } else {
            tomorrow = moment().add(1, 'days').format('D/MM/YYYY');
            dayAfterTomorrow = moment(tomorrow, "D/MM/YYYY").add(parseInt(nights), 'days').format('D/MM/YYYY');
        }
        if (hotelPath) {
            navPath = hotelPath.replace(".html", "");
            navPath = navPath + ROOMS_PATH;
            navPath = updateQueryString("overrideSessionDates", "true", navPath);
            navPath = updateQueryString("from", tomorrow, navPath);
            navPath = updateQueryString("to", dayAfterTomorrow, navPath);
            navPath = updateQueryString("offerRateCode", offerRateCode, navPath);
            navPath = updateQueryString("offerTitle", offerTitle, navPath);
        }

        // creating the URL for the button
        if (navPath != "" && navPath != null && navPath != undefined) {
            navPath = navPath.replace("//", "/");
        }
        if ((!navPath.includes("http://") && navPath.includes("http:/"))
                || (!navPath.includes("https://") && navPath.includes("https:/"))) {
            navPath = navPath.replace("http:/", "http://").replace("https:/", "https://");
        }
		if(offerType != undefined && offerType != null && offerType.indexOf("taj-innercircle-special-offer") != -1 && !getUserData()){
			 $('body').trigger('taj:sign-in');
		}
		else{
        window.location.href = navPath;
		}
    } catch (err) {
        console.error('error caught in function onOfferSelection');
        console.error(err);
    }
}

function onOfferViewDetailsSelection(offerDetailsPath, offerRateCode, offerTitle, noOfNights, startsFrom,
        comparableOfferRateCode,offerType) {
    try {
        // code replaced to navigate to rooms page instead of view details
        if (offerRateCode) {
            navigateToRooms(offerDetailsPath, offerRateCode, offerTitle, noOfNights, startsFrom,
                    comparableOfferRateCode);
        } else {

            window.location.href = offerDetailsPath;

        }
    } catch (err) {
        console.error('error caught in function onOfferViewDetailsSelection');
        console.error(err);
    }
}

function navigateToRooms(offerDetailsPath, offerRateCode, offerTitle, noOfNights, startsFrom, comparableOfferRateCode) {
    try {
        var hotelPath = offerDetailsPath.split("offers-and-promotions")[0];
        var ROOMS_PATH = "rooms-and-suites.html";
        var navPath = hotelPath.replace(".html", "");
        navPath = navPath + ROOMS_PATH;
        if (navPath != "" && navPath != null) {
            navPath = navPath.replace("//", "/");
        }
        if (offerRateCode) {
            if (comparableOfferRateCode) {
                offerRateCode = offerRateCode + ',' + comparableOfferRateCode;
            }
            navPath = updateQueryString("offerRateCode", offerRateCode, navPath);
            navPath = updateQueryString("offerTitle", offerTitle, navPath);
        }
        navPath = navPath.replace("//", "/");
        if ((!navPath.includes("http://") && navPath.includes("http:/"))
                || (!navPath.includes("https://") && navPath.includes("https:/"))) {
            navPath = navPath.replace("http:/", "http://").replace("https:/", "https://");
        }
        // console.log(navPath)
        window.location.href = navPath;
    } catch (err) {
        console.error('error caught in function navigateToRooms');
        console.error(err);
    }
}

$(document).ready(
        function() {
            try {

                if($("#isOnlyBungalow").text()){
					var bookingOptions = dataCache.session.getData("bookingOptions");
                    bookingOptions.isOnlyBungalowPage = true;
                    dataCache.session.setData("bookingOptions", bookingOptions);
                }
                amaBookingObject = getInitialBookAStaySessionObject();
                amaBookingObject.isAmaCheckAvailabilitySelected = false;
                amaBookingObject.roomType = "room";
                var $guestDropdownWrp = $('.guests-dropdown-wrap');
                autoPopulateBannerBookAStay();

                $guestDropdownWrp.on('click', '.roomHeading', function() {
                    $(this).parent().toggleClass('hideDiv');

                });

                var shouldInvokeCalendarApi = false;
                if(document.getElementById("shouldInvokeCalendarApi"))
					var shouldInvokeCalendarApi = document.getElementById("shouldInvokeCalendarApi").value;
				var checkoutCalendarCAbinded = false;
				if(shouldInvokeCalendarApi){
                    //***Removing Ama Calendar rates****///
					amacacalendarPricing();
				}					
                $('.check-avblty-guests-input').click(function() {
                    showGuestSelectionDropdown();
                    $('.check-avblty-guests-input').toggleClass('eNone');
                });
                var isEndDateTriggered;
                $('#ama-cal-img-to').on('click', function() {
                    $('#input-box-to').focus();
                    $('#input-box-to').click();
                });
                $('#ama-cal-img-from').on('click', function() {
                    $('#input-box-from').focus();
                    $('#input-box-from').click();
                });
                $('#input-box-from').on('change', function(e) {
                    var $nextInput = $('.input-box-ama.date-explore').not($(this));
                    var currVal = $(this).val();
                    var nextVal = $nextInput.val();
                    amaBookingObject.fromDate = moment(new Date(currVal)).format('MMM D YY');
                    amaBookingObject.isAmaCheckAvailabilitySelected = true;
					
					addOfferCalendarLoader();
					setTimeout(function(){ $('.datepicker-loader').remove();},150);					
                    setTimeout(function() {
                        $(this).blur();
                        $('#input-box-to').focus();
                        $('#input-box-to').click();
                        $('.bas-left-date-wrap-ama').removeClass('active');
                        $nextInput.focus();
                        if ($('#input-box-from').datepicker('getDate') >= $('#input-box-to').datepicker('getDate')) {
                            var nextDate = moment((new Date(currVal)).setDate((new Date(currVal)).getDate() + 1)).format('MMM D YY');
                            $nextInput.datepicker('setDate', new Date(nextDate));
                            isEndDateTriggered = true;
                            amaBookingObject.toDate = moment(new Date(nextDate)).format('MMM D YY');
                            amaBookingObject.isAmaCheckAvailabilitySelected = true;
                        }
                        CloseDatePickerIfRequired();
						if(!checkoutCalendarCAbinded){
                            //***Removing Ama Calendar rates****///
							amacacalendarPricing();
							bindNextPrevClickAmaCa();													
							checkoutCalendarCAbinded = true;
						}	
						$('.check-in-check-out-input-wrap').trigger('click');												
                    }, 100);
                });

                $('#input-box-to').on('change', function(e) {
                    setTimeout(function() {
                        if (isEndDateTriggered) {
                            isEndDateTriggered = false;
                        } else {
                            $(this).blur();
                            $('.check-avblty-input-wrap .input-daterange#ama-ca-datepicker input').each(function() {
                                $(this).blur();
                            });
                            $('.input-box-wrapper-ama').hide();
                            $(document).click();
                        }
                        amaBookingObject.toDate = moment(new Date($('#input-box-to').val())).format('MMM D YY');
                        amaBookingObject.isAmaCheckAvailabilitySelected = true;
                        CloseDatePickerIfRequired();
                    }, 100);
                });
                // function in book a stay js
                initializeDatepickerForBookAStay($('.check-avblty-input-wrap .input-daterange#ama-ca-datepicker'),
                        $('.input-box-wrapper-ama'));

                $('#input-box-from').on('click', function() {
                    showCalenderCheckAvailAma($(this), $('.bas-left-date-wrap-ama'));
                });

                $('#input-box-to').on('click', function() {
                    showCalenderCheckAvailAma($(this), $('.bas-right-date-wrap-ama'));
                });

                function showCalenderCheckAvailAma(_this, checkinoutCont) {
                    _this.focus();
                    checkinoutCont.addClass('active').siblings('.bas-single-wrap').removeClass('active');
                    $('.input-box-wrapper-ama').show();
                    $('.bas-calander-container-ama').css('display', 'flex');
                }

                $guestDropdownWrp.on('click', ' .adult-dec, .child-dec, .adult-inc, .child-inc',
                        function() {
                            var item = $(this);
                            var parentItem = item.parent().parent();
                            var count = item.siblings('.counter').text();
                            var isAdultWrp = parentItem.hasClass('adult-wrap');
                            if (item.attr('class').includes('inc')) {
                               if (isBungalowSelected()) {
                                    if ((isAdultWrp && (count > 0 && count < 16))
                                            || (!isAdultWrp && (count > -1 && count < 8))) {
                                        changeGuestCounter(item);
                                    }
                                } else {
                                    if ((isAdultWrp && (count > 0 && count < 16))
                                            || (!isAdultWrp && (count > -1 && count < 7))) {
                                        changeGuestCounter(item);
                                    }
                                }
                            } else if (item.attr('class').includes('dec')) {
                                if ((isAdultWrp && count > 1) || (!isAdultWrp && count > 0)) {
                                    changeGuestCounter(item);
                                }
                            }
                            updateIndividualRoomGuestCount($(this));
                            updateGuestPlaceholder();
                            amaBookingObject.isAmaCheckAvailabilitySelected = true;
                            amaBookingObject.roomOptions = getRoomOptionsSelectedAma();

                        });

                var $guestDropdwnAddBtn = $('.add-room-button');
                $guestDropdownWrp.on('click', '.close-current-room', function() {
                    var roomCounter = $('.guests-dropdown-wrap .guest-room-header').length;
                    var deletedRoom = $(this).closest(".guest-room-header");
                    var deletedRoomIndex = deletedRoom.index();
                    deleteRoomInCartAndUpdateSelectionData(deletedRoomIndex);
                    deletedRoom.nextAll('.guest-room-header').each(function() {
                        deletedRoomIndex++;
                        var _this = $(this);
                        _this.attr('id', 'roomGuestDetails' + deletedRoomIndex);
                        _this.attr('data-room-index', deletedRoomIndex);
                        _this.find('.guest-room-count').text(deletedRoomIndex);
                    });
                    deletedRoom.remove();
                    if (deletedRoomIndex < 5) {
                        $guestDropdwnAddBtn.removeClass('add-room-button-remove');
                    }
                    updateGuestPlaceholder();
                    amaBookingObject.isAmaCheckAvailabilitySelected = true;
                    amaBookingObject.roomOptions = getRoomOptionsSelectedAma();
                });

                $('#addButton').on('click', function() {
                    var roomCounter = $('.guests-dropdown-wrap .guest-room-header').length;
                    if (roomCounter < 5) {
                        roomCounter++;
                        var roomGuestDetails = $(this).prev();
                        var clonedRoomGuestDetails = roomGuestDetails.clone();
                        clonedRoomGuestDetails.find('.noOfPeople').text("(1 Guest)");
                        roomGuestDetails.after(clonedRoomGuestDetails);
                        var cloned = $(this).prev();
                        cloned.find('.guest-room-count').text(roomCounter);
                        cloned.find('.adult-wrap .counter').text(1);
                        cloned.find('.children-wrap .counter').text(0);
                        cloned.attr('data-room-index', roomCounter);
                        cloned.attr('id', 'roomGuestDetails' + roomCounter)
                        cloned.find('.close-current-room').removeClass('display-none');
                    }
                    if (roomCounter > 4) {
                        $guestDropdwnAddBtn.addClass('add-room-button-remove');
                    }
                    updateGuestPlaceholder();

                    amaBookingObject.isAmaCheckAvailabilitySelected = true;
                    amaBookingObject.roomOptions = getRoomOptionsSelectedAma();
                });

                $('#checkAvailability').click(function() {
                    var path = $(this).attr('hrefvalue');
                    isAmaCheckAvailability = true;
                    if (path) {
                        if (numberOfNightsSelectedCheck()) {
                            onClickOnCheckAvailabilty();
                        } else {
                            numberOfNightsExcessWarning(); // function in book a stay js
                        }
                    }

                });

                setTimeout(function() {
                    /* Dropdown Menu */
                    $('.ama-check-availability .dropdown').click(function() {
                        $(this).attr('tabindex', 1).focus();
                        $(this).toggleClass('active');
                        $(this).find('.dropdown-menu').slideToggle(300);
                    });
                    $('.ama-check-availability .dropdown').focusout(function() {
                        $(this).removeClass('active');
                        $(this).find('.dropdown-menu').slideUp(300);
                    });
                    /* End Dropdown Menu */
                }, 3000);

                $('.check-avblty-wrap').on('click', '.dest-item, .hotel-item', function() {
                    updateDestination($(this)); // function in searchBar js
                });

                // radio button click events
                $('.check-avblty-container .radio-container input[type=radio]').change(function() {
                    bungalowRadioSelector();
                    resetAdultChildCount('1', '0');
                });

                $('.book-stay-popup-radio-btn #onlyBungalowBtn').change(function() {
                    // function in book a stay js
                    removePopulatedRoomsBookAStay($(".bas-room-no"));
                    removePopulatedRoomsBookAStay($(".bas-room-details"));
                    $(".bas-room-no").click();
                    selectedRoomsCount = $('.fc-add-package-con').length;
                    if (selectedRoomsCount > 1) {
                        deleteSeletedRoomsInCartAma();
                    }
                });

                disableRoomsRadioBtnInBungalowPage();

            } catch (err) {
                console.error('caught exception in ama checkAvailability js', err);
            }

        });

function disableRoomsRadioBtnInBungalowPage() {
    var isOnlyBungalow = isOnlyBungalowAvailable();
    var currentURL = window.location.pathname;
    if (currentURL.includes('accommodations')) {
        if (isOnlyBungalow) {
            updateOnlyBungalowInSession(true);
            updateBungalowGuest();
        } else {
            updateOnlyBungalowInSession(false);
            updateGuests();
        }
    } else if ($('.cm-page-container').hasClass('home-page-layout') || $('.cm-page-container').hasClass('specific-hotels-page')) {
        updateOnlyBungalowInSession(false);
        updateGuests();
    }
    updateRadioBtnStatus();
    updateGuestPlaceholder();
}

function updateBungalowGuest() {
    amaBookingObject.isAmaCheckAvailabilitySelected = false;
    var bookingOptions = dataCache.session.getData('bookingOptions');
    resetAdultChildCount(bookingOptions.roomOptions[0].adults, bookingOptions.roomOptions[0].children);
}
function updateRadioBtnStatus() {
    if (isOnlyBungalowPageInSession()) {
        $('#onlyRoom, #onlyRoomBtn').parent('.radio-container').addClass('disable-radiobtn');
        $('.check-avblty-container .radio-container #onlyBungalow, .book-stay-popup-radio-btn #onlyBungalowBtn')
                .click();
    } else {
        $('#onlyRoom, #onlyRoomBtn').parent('.radio-container').removeClass('disable-radiobtn');
    }
}

function updateOnlyBungalowInSession(isOnlyBungalow) {
    var bookingOptions = dataCache.session.getData("bookingOptions");
    if (bookingOptions) {
        bookingOptions.isOnlyBungalowPage = isOnlyBungalow;
        if (isOnlyBungalow) {
            bookingOptions.BungalowType = "onlyBungalow";
            if (bookingOptions.previousDates) {
                bookingOptions.previousDates.BungalowType = "onlyBungalow";
            }
            bookingOptions.rooms = 1;
            var roomOptions = changeRoomGuestToBungalow(bookingOptions.roomOptions);
            bookingOptions.roomOptions = [ roomOptions ];
        }
        dataCache.session.setData("bookingOptions", bookingOptions);
    }
}

function isOnlyBungalowPageInSession() {
    var bookingOptions = dataCache.session.getData("bookingOptions");
    if (bookingOptions && bookingOptions.isOnlyBungalowPage) {
        return true;
    }
    return false;
}

function autoPopulateBannerBookAStay() {
    updateDate();
    populateRadioButton();
    // updateGuests();
    // updateGuestPlaceholder();
}

function deleteSeletedRoomsInCartAma() {
    var bookingOptions = dataCache.session.getData("bookingOptions");
    bookingOptions.selection = [];
    bookingOptions.rooms = 1;
    bookingOptions.roomOptions = getInitialRoomOption();
    dataCache.session.setData("bookingOptions", bookingOptions);
    $('.fc-add-package-con').each(function() {
        $(this).remove();
    });
    var floatingCartAma = $('.book-ind-container');
    floatingCartAma.find('.checkout-num').text('0');
    floatingCartAma.find('.cart-total-price').text('0');
    floatingCartAma.css('display', 'none');
    $('.cm-bas-con .cm-bas-content-con').css('bottom', '4%');
}

function getRoomOptionsSelectedAma() {
    var roomsSelector = $('.guests-dropdown-wrap .guest-room-header');
    var roomOptions = [];
    roomsSelector.each(function() {
        var $this = $(this);
        var index = parseInt($this.data('room-index')) - 1;
        roomOptions.push({
            "adults" : $this.find('.adult-wrap .counter').text(),
            "children" : $this.find('.children-wrap .counter').text(),
            "initialRoomIndex" : index
        });
    });
    return roomOptions;
}

function CloseDatePickerIfRequired() {
    if (!$('.input-box-wrapper-ama').is(':visible')) {
        $('.bas-calander-container-ama').css('display', 'none');
    }
}

function updateIndividualRoomGuestCount(_this) {
    var room = _this.closest('.guest-room-header');
    var count = parseInt(room.find('.adult-wrap .counter').text())
            + parseInt(room.find('.children-wrap .counter').text());
    room.find('.noOfPeople').text('(' + count + ' ' + createGuestWordAma(+count, 'Guest') + ')');
}

function changeGuestCounter(element) {
    var counter = element.siblings('.counter').text();
    if (element.attr('class').includes('inc')) {
        counter++;
    } else if (element.attr('class').includes('dec')) {
        counter--;
    }
    element.siblings('.counter').text(counter);
    var currentAdult = $('.adult-wrap .counter').text();
    var currentChild = $('.children-wrap .counter').text();
    var guestUpdate = element.parent().parent().parent().siblings(".roomHeading").children(".noOfPeople");
    var totalGuest = parseInt(currentAdult) + parseInt(currentChild);
}

function updateDate() {
    var bookedOptions = fetchBookAStayDataToPopulate();
    if (bookedOptions) {
        var bookedCheckInDate = moment(bookedOptions.fromDate, "MMM Do YY").format("DD MMM YYYY");
        var bookedCheckOutDate = moment(bookedOptions.toDate, "MMM Do YY").format("DD MMM YYYY");
        $('#input-box-from').val(bookedCheckInDate);
        $('#input-box-to').val(bookedCheckOutDate);
    }

}

function updateGuests() {
    var bookingOptions = fetchBookAStayDataToPopulate();
    var adults;
    var children;
    var rooms = bookingOptions.roomOptions.length;
    removePopulatedRoomsBookAStay($('.check-avblty-wrap .guest-room-header'));
    if (rooms > 1) {
        var index = 1;
        adults = bookingOptions.roomOptions[index - 1].adults;
        children = bookingOptions.roomOptions[index - 1].children;
        $('.guests-dropdown-wrap .adult-wrap .counter').text(adults);
        $('.guests-dropdown-wrap .children-wrap .counter').text(children);
        while (index < rooms) {
            var roomGuestDetails = $('#addButton').prev();
            roomGuestDetails.after(roomGuestDetails.clone());
            adults = bookingOptions.roomOptions[index].adults;
            children = bookingOptions.roomOptions[index].children;
            var cloned = $('#addButton').prev();
            index++;
            cloned.attr("id", "roomGuestDetails" + index);
            cloned.find('.guest-room-count').text(index);
            cloned.find('.adult-wrap .counter').text(adults);
            cloned.find('.children-wrap .counter').text(children);
            cloned.attr('data-room-index', index);
            cloned.find('.close-current-room').removeClass('display-none');
            var guestCountOfThisRoom = +adults + +children;
            cloned.find('.noOfPeople').text(
                    '(' + guestCountOfThisRoom + ' ' + createGuestWordAma(+guestCountOfThisRoom, 'Guest') + ')');

        }
        if (rooms == 5) {
            $('.check-avblty-wrap #addButton').addClass('add-room-button-remove');
        } else {
            $('.check-avblty-wrap #addButton').removeClass('add-room-button-remove');
        }
    } else {
        adults = bookingOptions.roomOptions[0].adults;
        children = bookingOptions.roomOptions[0].children;
        resetAdultChildCount(adults, children);
    }
}

function fetchBookAStayDataToPopulate() {
    return amaBookingObject.isAmaCheckAvailabilitySelected ? amaBookingObject : dataCache.session
            .getData('bookingOptions');
}

function showGuestSelectionDropdown() {
    $('.guests-dropdown-wrap').toggleClass('display-block');
    $('.check-avblty-guests-input .icon-drop-down-arrow').toggleClass('rotate-arrow');
}

function updateGuestPlaceholder() {
    var roomGuestDetails = $('.guests-dropdown-wrap .guest-room-header');
    var rooms = roomGuestDetails.length;
    var adults = 0;
    var children = 0;
    roomGuestDetails.each(function() {
        adults = adults + parseInt($(this).find('.adult-wrap .counter').text());
        children = children + parseInt($(this).find('.children-wrap .counter').text());
    })
    var guests = adults + children;
    if (isBungalowSelected()){
        var guestsCount = guests + ' ' + createGuestWordAma(guests, "Guest");
    }
    else{
    var guestsCount = guests + ' ' + createGuestWordAma(guests, "Guest") + ' ' + rooms + ' '
            + createGuestWordAma(guests, "Room");
    }
    $('.guest-title-wrap').text(guestsCount);
}

function createGuestWordAma(count, word) {
    if (count > 1) {
        return word + 's';
    }
    return word;
}

function parseDate(selectedDateValue) {
    return moment(selectedDateValue).format("MMM Do YY");
}

function bungalowRadioSelector() {
    var roomHeading = $('.check-avblty-wrap .roomHeading');
    var addRoom = $('.check-avblty-wrap #addButton');
    var roomElements = $('.guests-dropdown-wrap .guest-room-header');
    amaBookingObject.isAmaCheckAvailabilitySelected = true;
    if (isBungalowSelected()) {
        amaBookingObject.roomType = "onlyBungalow";
        roomHeading.hide();
        addRoom.addClass('add-room-button-remove');
        var selectedRoomsCount = $('.fc-add-package-con').length;
        if (selectedRoomsCount > 1) {
            deleteSeletedRoomsInCartAma()
        }
        if (roomElements) {
            removePopulatedRoomsBookAStay(roomElements); // function present in book a stay js
        }
    } else {
        amaBookingObject.roomType = "IndividualRoom";
        roomHeading.show();
        addRoom.removeClass('add-room-button-remove');
    }
    setTimeout(function() {
        updateGuestPlaceholder();
    }, 100);
}

function resetAdultChildCount(adults, children) {
    $('.adult-wrap .counter').text(adults);
    $('.children-wrap .counter').text(children);
}

function populateRadioButton() {
    var bookingOptions = fetchBookAStayDataToPopulate();
    var bungalow = $('.check-avblty-container .radio-container #onlyBungalow, .book-stay-popup-radio-btn #onlyBungalowBtn');
    var room = $('.check-avblty-container .radio-container #onlyRoom, .book-stay-popup-radio-btn #onlyRoomBtn');
    var addRoom = $('.check-avblty-wrap #addButton');
    if (bookingOptions && bookingOptions["BungalowType"] && bookingOptions["BungalowType"] == "onlyBungalow") {
        bungalow.click();
        addRoom.addClass('add-room-button-remove');
    } else {
        room.click();
        addRoom.removeClass('add-room-button-remove');
    }
}

function numberOfNightsSelectedCheck() {
    var currentDate = parseSelectedDate($("#input-box-from").datepicker("getDate"));
    var nextDate = parseSelectedDate($("#input-box-to").datepicker("getDate"));
    var numberOFNights = moment(nextDate, "MMM Do YY").diff(moment(currentDate, "MMM Do YY"), 'days');
    if (numberOFNights > 10 && $('#checkAvailability').hasClass('enabled'))
        return false;
    else
        return true;
}

function isOnlyBungalowAvailable() {
    var roomsList = $('.rate-cards-container .rate-card-wrap');
    var roomIterator = 0;
    var roomCount = roomsList.length;
    if (!roomCount) {
        return false;
    }
    for (roomIterator = 0; roomIterator < roomCount; roomIterator++) {
        if ($(roomsList[roomIterator]).attr('data-room-type') != "bungalow") {
            return false;
        }
    }
    return true;
}

//***Removing Ama Calendar rates****//
function amacacalendarPricing(){
    //var isCalendarPricing = document.getElementById("isCalendarPricing").value;
    var isCalendarPricing = true;
	checkoutCalendarCAbinded = false;
    if( isCalendarPricing == true){	
	
	if(checkoutCalendarCAbinded)
		return;
	
	$('.check-in-check-out-input-wrap').click(function(e) {
		e.stopImmediatePropagation();
		e.stopPropagation()
        currentCalendarInputDate = new Date($($(e.currentTarget).find('input')[0]).val());

		if(!($($(e.currentTarget).find('input')[0]).val()) && $($(e.currentTarget).find('input')[0]).hasClass('enquiry-from-value')){
			currentCalendarInputDate = new Date();
		}
		if(!($($(e.currentTarget).find('input')[0]).val()) && $($(e.currentTarget).find('input')[0]).hasClass('enquiry-to-value')){
			currentCalendarInputDate = moment($($(e.currentTarget).closest('.row').find('.enquiry-from-value')[0]).val(), "DD/MM/YYYY")._i;
		}
        var currentCalendarMonthName = monthOfferNames[currentCalendarInputDate.getMonth()];
        var currentCalendarYear = currentCalendarInputDate.getFullYear();
		var  currentCalendarMonthLastDay = new Date(currentCalendarYear, monthOfferNames.indexOf(currentCalendarMonthName) + 1, 0);
                    
        caSelectedHotel = $("#hotelIdFromSearch").text() || pageLevelData.hotelCode;
        var monthJsonCheck = monthAvailability[caSelectedHotel] && monthAvailability[caSelectedHotel][currentCalendarMonthName + currentCalendarYear];
		
         if(!monthJsonCheck || (monthJsonCheck && new Date(monthJsonCheck[monthJsonCheck.length - 1].end) < currentCalendarMonthLastDay)){
			$('td.day').attr('data-custom', '');
			caSelectedFromdate = caSelectedTodate ? new Date((caSelectedTodate.getTime() +  (1 * 24 * 60 * 60 * 1000))) : new Date();
            caSelectedTodate =  new Date((caSelectedFromdate.getTime() +  (60 * 24 * 60 * 60 * 1000)));

			var caUrl = "/bin/calendarAvailability.rates/" + caSelectedHotel + "/" +moment(caSelectedFromdate).format('YYYY-MM-DD') + "/" +
			moment(caSelectedTodate).format('YYYY-MM-DD') + '/INR/1,0/["STD"]/[]//P1N/ratesCache.json';
			console.log("check availability URL",caUrl);

			monthExisting = false;
            console.log($('.datepicker-days').find('tbody'));
            $('.datepicker-loader').remove();
			addOfferCalendarLoader();
            $.ajax({
             type : "GET",
             url:   caUrl,
             contentType : "application/json"
             }).done(addPriceDetails1).fail().always(function() {});
			 
             bindNextPrevClickAmaCa();
           

         }else{
             monthExisting = true;
             addPriceDetails1(monthAvailability);
		}
	return false;
	});	 
	}
}

 $('.check-avblty-wrap').on('click', '.dest-item, .hotel-item', function(){
	if(shouldInvokeCalendarApi){
		caSelectedTodate = currentCalendarInputDate;
	}
 });

function bindNextPrevClickAmaCa(){
setTimeout(function(){ $('.datepicker .datepicker-days .next,.datepicker .datepicker-days .prev').click(function(e) {
                setTimeout(function(){
                    console.log("e",e);
                    var currentCalendarMonthName =$($(e.target).closest('tr').find('.datepicker-switch')[0]).text().split(' ')[0];
                	var currentCalendarYear = $($(e.target).closest('tr').find('.datepicker-switch')[0]).text().split(' ')[1].substring(0,4);
                    var  currentCalendarMonthLastDay = new Date(currentCalendarYear, monthOfferNames.indexOf(currentCalendarMonthName) + 1, 0);
                    console.log(currentCalendarMonthName, currentCalendarYear);
                    
                    var monthJsonCheck = monthAvailability[caSelectedHotel] && monthAvailability[caSelectedHotel][currentCalendarMonthName + currentCalendarYear];
                    if(!monthJsonCheck || (monthJsonCheck && new Date(monthJsonCheck[monthJsonCheck.length - 1].end) < currentCalendarMonthLastDay)){

                        caSelectedFromdate = caSelectedTodate ? new Date((caSelectedTodate.getTime() +  (1 * 24 * 60 * 60 * 1000))) : new Date();
                        caSelectedTodate =  new Date((caSelectedFromdate.getTime() +  (60 * 24 * 60 * 60 * 1000)));

                        var caUrl = "/bin/calendarAvailability.rates/" + caSelectedHotel + "/" +moment(caSelectedFromdate).format('YYYY-MM-DD') + "/" +
						moment(caSelectedTodate).format('YYYY-MM-DD') + '/INR/1,0/["STD"]/[]//P1N/ratesCache.json';
						console.log("check availability URL",caUrl);

                        monthExisting = false;
						$('.datepicker-loader').remove();
						addOfferCalendarLoader();
	
                        $.ajax({
                             type : "GET",
                             url : caUrl,
                             contentType : "application/json"
                             }).done(addPriceDetails1).fail().always(function() {});	
                    }else{
                        monthExisting = true;
                        addPriceDetails1(monthAvailability);
                    }
                },500);
            }); }, 500);
}

function addOfferCalendarLoader(){
    var calenderText = "Finding best rates..";
    if($("#showPrice").val()){
		calenderText = "Finding best rates..";
    }
    else{
        calenderText = "Checking Availability..";
    }
	$('.datepicker-days').find('tbody').append(
	'<div  class="datepicker-loader" style=""><p style="opacity: 1;margin-top: 26%; margin-left: 23%;font-size: x-large;">'+calenderText+'</p></div>');
	$('.ama-check-availability .datepicker-loader').attr('style', 'max-width: 165% !important; width:'+$('.ama-check-availability .datepicker .table-condensed').width()  + 'px');
	
}


var caSelectedHotel;
var caSelectedFromdate;
var caSelectedTodate;
var ItineraryDetails;
var currentCalendarInputDate;
var monthExisting;
var monthOfferNames = ["January", "February", "March", "April", "May", "June",
	  "July", "August", "September", "October", "November", "December", "December"];
var monthAvailability = {};  
var monthJson;

function processOfferRatesJSON(rateJson){	
    monthJson = monthJson ? monthJson : {};	
    monthJson[caSelectedHotel] =  monthJson[caSelectedHotel] ? monthJson[caSelectedHotel] : {};
	for(var i=0;i<rateJson.hotelStays.length;i++){
		var startmonth = new Date(rateJson.hotelStays[i].start).getMonth();
		var endmonth = new Date(rateJson.hotelStays[i].end).getMonth();
		var startYear = new Date(rateJson.hotelStays[i].start).getFullYear();
		var endYear = new Date(rateJson.hotelStays[i].end).getFullYear();
		if(!(monthJson[caSelectedHotel] && monthJson[caSelectedHotel][monthOfferNames[startmonth] + startYear]))
			monthJson[caSelectedHotel][monthOfferNames[startmonth]+startYear] = [];

		monthJson[caSelectedHotel][monthOfferNames[startmonth]+ startYear].push(rateJson.hotelStays[i]);
        //startmonth ++;
		var arrayendmonth = endmonth;
		if(endYear > startYear){
			arrayendmonth = startmonth + endmonth + 1
		}
		var thisYear = startYear; 
		while(arrayendmonth >= startmonth){			
			if(!monthJson[caSelectedHotel][monthOfferNames[startmonth] + thisYear])
				monthJson[caSelectedHotel][monthOfferNames[startmonth] + thisYear] = [];
			monthJson[caSelectedHotel][monthOfferNames[startmonth] +thisYear].push(rateJson.hotelStays[i]);
            caSelectedTodate = new Date(rateJson.hotelStays[i].end);
			startmonth ++;	
			if(endYear > startYear && startmonth == 12 ){
				startmonth = 0;
				thisYear = endYear;
				arrayendmonth = endmonth;
			}
		}
	}


	console.log("FINAL JSON", monthJson);
	return monthJson;
}

//***Removing Ama Calendar rates****//
function addPriceDetails1(response) {
	$('.datepicker-loader').remove();	
	var data= response;	
	console.log('JSON response', response);	
	
	if(response.errorMessage && response.errorMessage.indexOf('Invalid Promotion Code') != -1){
		warningBox({
					title : '',
					description : 'The selected hotel is not participating in this offer.',
					callBack : null,
					needsCta : false,
					isWarning : true
			});
			return;
	}
	
	monthAvailability = monthExisting ? response : processOfferRatesJSON(response);

	if(!currentCalendarMonthName){
        currentCalendarMonth = currentCalendarInputDate ? currentCalendarInputDate.getMonth() : $("#input-box-from").datepicker("getDate").getMonth();
		//var currentCalendarMonth = $("#input-box1").datepicker("getDate").getMonth();
        if(currentCalendarMonth == undefined || currentCalendarMonth == null){
			var currentDate = new Date();
            currentCalendarMonth = currentDate.getMonth();
        }
		var currentCalendarMonthName = monthOfferNames[currentCalendarMonth];
        var currentCalendarYear = currentCalendarInputDate ? currentCalendarInputDate.getFullYear(): $("#input-box-to").datepicker("getDate").getFullYear();
        if(!currentCalendarYear){
			var currentDate = new Date();
            currentCalendarYear = currentDate.getFullYear();
        }
	}	
	if(monthAvailability[caSelectedHotel] && monthAvailability[caSelectedHotel][currentCalendarMonthName+currentCalendarYear]){
		showPricesOne(monthAvailability[caSelectedHotel][currentCalendarMonthName+currentCalendarYear]);
	}	
}

//***Removing Ama Calendar rates****//
function showPricesOne(currentMonth){
		var localDateTimestamp = "";		var localDateMonth ="" ; var localDateYear = ""; let isCheckInContainer = true;
        $(".datepicker-days td").filter(function() {
				var date = $(this).text();
				return /\d/.test(date);

			}).each(function(){
            	let $currentInputElem = $(this).parents(".jiva-spa-date-section.package-input-wrp");
				if($('.bas-right-date-wrap-ama').hasClass('active'))
					isCheckInContainer = false;
				//localDateTimestamp = new Date(new Date($(this).data('date')).toLocaleDateString()).getTime();
            	localDateTimestamp = new Date(moment(($(this).data('date'))).format("MM/DD/YYYY")).getTime();
				localDateMonth = monthOfferNames[new Date(localDateTimestamp).getMonth()];
				localDateYear = new Date(localDateTimestamp).getFullYear();
				pricemonth = monthAvailability[caSelectedHotel][localDateMonth + localDateYear];

            if(pricemonth){
                	innerloopbas:
				//console.log("pricemonth",pricemonth);
                    for(var i=0;i<pricemonth.length;i++){
                        if(localDateTimestamp <= new Date(pricemonth[i].end).getTime() && localDateTimestamp >= new Date(pricemonth[i].start).getTime()){
                        if(pricemonth[i].status == 'Close'){
							$(this).attr('data-custom', 'X').addClass("disabled");
                            if(!isCheckInContainer && $(this).prev().attr('data-custom') != 'X'){
								$(this).removeClass("disabled");
                            }
                            break;
                        }
					/*else if(pricemonth[i].status == 'Open' || pricemonth[i].status == 'MinStay'){
						var priceStartDate, priceEndDate, price;
						for(var j=0;j<pricemonth[i].prices.length;j++){
						var priceItem = pricemonth[i].prices[j];
						priceStartDate = new Date(priceItem.start).getTime(); 
						priceEndDate = new Date(priceItem.end).getTime(); 
                        //priceItem.currencyCode = priceItem.currencyCode == 'INR' ? '₹' : priceItem.currencyCode;
                        //price = priceItem.currencyCode + parseInt(priceItem.amountBeforeTax) 
						var pricevals = ((parseInt(priceItem.amountBeforeTax)/1000)+'').split('.');
						var decimal= pricevals[1] ? '.'+pricevals[1].substring(0,1)  : '';
						price = '₹' + pricevals[0] + decimal + 'K';
						$(this).attr('data-custom', '');
                            if(localDateTimestamp >= priceStartDate && localDateTimestamp <= priceEndDate){	
						if($("#showPrice").val()){
							$(this).attr('data-custom', price);
                            break innerloopbas;
						  }
						if(isCheckInContainer)
							$(this).removeClass('disabled-checkIn');
						else 
							$(this).removeClass('disabled-checkOut');

						}
                        }
					}*/
                    }					
                    }
        	}
		});		
    }



$(document).mouseup(function(e) {
    var container = $(".guests-dropdown-wrap");
    var datepickerContainer = $(".input-box-wrapper-ama");

    if (datepickerContainer.is(":visible")) {
        if (!datepickerContainer.is(e.target) && datepickerContainer.has(e.target).length === 0) {
            $('.bas-calander-container-ama').css('display', 'none');
        }
    } else {
        $('.bas-calander-container-ama').css('display', 'none');
    }
    // if the target of the click isn't the container nor a descendant of the container
    if (container.is(":visible")) {
        if (!container.is(e.target) && container.has(e.target).length === 0) {
            container.toggleClass('display-block');
            $('.check-avblty-guests-input').toggleClass('eNone');
            $('.check-avblty-guests-input .icon-drop-down-arrow').toggleClass('rotate-arrow');
        }
    }
});

/* START - Banner auto suggest textbox - hotels/destinations search */

$("#dest-banner").click(function(event) {
    event.preventDefault();
    if($("#search-properties").children().length > 1) {
        $("#search-properties").show();
        const myTimeout = setTimeout(regiterRedirectionEvents, 20);
    }
});

function regiterRedirectionEvents() {
    $(".dest-item").click(function() {
        selectDestOrProp($(this));
        //redirectToDestOrHotel($(this).attr("data-redirect-path"));
    });
    $(".hotel-item").click(function() {
        selectDestOrProp($(this));
        /*
        let hotelRedirectionPath = $(this).attr("data-redirect-path");
        if(hotelRedirectionPath.indexOf("accommodations/") == (hotelRedirectionPath.length-15) ) {
            hotelRedirectionPath = hotelRedirectionPath.slice(0, -15);
        }
        redirectToDestOrHotel(hotelRedirectionPath);
        */
    });
}

function selectDestOrProp(selectedElement) {
    $('#dest-banner').val(selectedElement.text());
    $("#search-properties").hide();
    if($('#checkAvailability').hasClass('enabled') == false)
    	$('#checkAvailability').addClass('enabled');
    startOfDataRedirectPath = selectedElement[0].outerHTML.indexOf("data-redirect-path=") + 20;
    selectedHTML = selectedElement[0].outerHTML;
    var reDirectPath = selectedHTML.substring(startOfDataRedirectPath, selectedHTML.indexOf('"', startOfDataRedirectPath));
    //var reDirectPath = selectedElement.children("a").data("redirect-path");
    enableBestAvailableButton(reDirectPath);
}

function redirectToDestOrHotel(dataRedirectPath) {
    document.location.href = dataRedirectPath;
}

$(document).ready(function(){

	$('#onlyBungalow').trigger('click')
    $('.ama-check-availability .radio-button').hide();

    $(window).click(function(e) {
        var id = e.target.id;
        if (id != "dest-banner") {
            if($('#search-properties').is(':visible'))
            {
                $('#search-properties').hide();
            }
        }
    });

    //$(".neupass-benfits").css("margin-top", "45px");

    $("#dest-banner").val("");
});

var destBannerInput = $('#dest-banner');
var SELECT_INPUT_DEBOUNCE_RATE = 1000;
var contentRootPath = $('#contentRootPath').val();

function createDestResult(title, path) {
    return '<li class="dest-item ama-dest-item"><a class="select-result-item" data-redirect-path="' + path + '">' + title
            + '</a></li>';
}
function createHotelResult(title, path, hotelId, isOnlyBungalow) {
    return '<li class="hotel-item"><a class="select-result-item" data-hotelId="' + hotelId
            + '"data-isOnlyBungalow="'+ isOnlyBungalow + '" data-redirect-path="' + path + '">' + title + '</a></li>';
}
function clearSelectResults(){
	$('#search-properties').empty();
    var items = $('.ama-theme .banner-container #search-properties li');
}

function showSelectResults(){
	$('#search-properties').empty();
	if(propertyArray.destination.length){
		$('#search-properties').append('<li class="dest-item property-heading">Destinations</li>');
            var destinations = propertyArray.destination;
            destinations.forEach(function(destination) {
                var destRedirectPath = destination.path;
                var destinationString = destination.title;
                var destHtml = createDestResult(destination.title, destRedirectPath);
                $('#search-properties').append(destHtml);
        });
	}
	
	if(propertyArray.hotel.length){
        $('#search-properties').append('<li class="dest-item property-heading">Hotels</li>');
        propertyArray.hotel.forEach(function(hotel) {
            var hotelDestination = hotel.title.split(', ');

            var reDirectToRoomPath = hotel.path.concat("accommodations/");
            var hotelHtml = createHotelResult(hotel.title, reDirectToRoomPath, hotel.id, hotel.isOnlyBungalowPage);
            $('#search-properties').append(hotelHtml);
            
        });
	}
}

$(".ama-dest-item").click( function() {
	//alert("click");
});

$('#dest-banner').on("keyup", debounce(function(e) {
    e.stopPropagation();
		$('#search-properties')[0].classList.remove("d-none");
        if (destBannerInput.val().length > 0) {
            clearSelectResults();

	        $.ajax({
            method : "GET",
            url : "/bin/search.data/" + contentRootPath.replace(/\/content\//g, ":") + "//" + destBannerInput.val() + "/result/searchCache.json"
			}).done(function(res,count) {
				    if (Object.keys(res.destinations).length) {
						$('#search-properties').append('<li class="dest-item property-heading">Destinations</li>');
						var destinations = res.destinations;
						destinations.forEach(function(destination) {
							var destRedirectPath = destination.path;
							var destinationString = destination.title;
							var destHtml = createDestResult(destination.title, destRedirectPath);
							$('#search-properties').append(destHtml);

						});
					}
					var websiteHotels = res.hotels.website;
					if (Object.keys(websiteHotels).length) {
						$('#search-properties').append('<li class="dest-item property-heading">Hotels</li>');
						websiteHotels.forEach(function(hotel) {
							var hotelDestination = hotel.title.split(', ');

								var reDirectToRoomPath = hotel.path.concat("accommodations/");
								var hotelHtml = createHotelResultOnlyBunglow(hotel.title, reDirectToRoomPath, hotel.id, 
																			hotel.maxGuests, hotel.maxBeds, hotel.isOnlyBungalowPage);
								$('#search-properties').append(hotelHtml);

						});
					}
					if(!(Object.keys(websiteHotels).length) && !(Object.keys(res.destinations).length)){
						$('#search-properties').append('<li>No results found. Please try another keyword</li>');
					}
                $('#search-properties').show();
                regiterRedirectionEvents()

			}).fail(function() {
            console.error('Ajax call failed.')
			});

        } else {
		 	showSelectResults();
            regiterRedirectionEvents();
        }


}, SELECT_INPUT_DEBOUNCE_RATE));

function createHotelResultOnlyBunglow(title, path, hotelId, maxGuests, maxBeds, isOnlyBungalow) {
    return '<li id="' + title + '" class="hotel-item" data-hotelid = "' + hotelId + '" data-max-guests="' 
    		+ maxGuests + '" data-max-beds="' + maxBeds  +  '" data-redirect-path="' + path + '"' 
            + '"data-isOnlyBungalow="true">' + title + '</li>';
}

/* END - Banner auto suggest textbox - hotels/destinations search */

document.addEventListener('DOMContentLoaded', function() {
    var scrollTop = $(window).scrollTop();
    $('.experience-details-close').click(function() {
        $('.experience-card-details-wrap').hide();
        $(".cm-page-container").removeClass('prevent-page-scroll');
        $(window).scrollTop(scrollTop);
    });
    $.each($('.experience-details-desc'), function(i, value) {
        $(value).cmToggleText({
            charLimit : 250
        })
    });

    $('.all-experiences-list').showMore();

    $('.mr-experinces-details-location').cmToggleText({
        charLimit : 35,
        showVal : "",
        hideVal : ""
    });
    
    $('.experience-details-short-desc').each(function(){
        $(this).cmToggleText({
            charLimit :135
        });
    });
});

function myFunction(obj) {
    var parent = $(obj).data("experience-name");
    var spaces = parent.replace(/ /g, '');
    //Adding this line for accessing the ids with '&' character.
    spaces = spaces.replace("&","\\&");
    $('#' + spaces).children('.experience-card-details-wrap').show();
    $(".cm-page-container").addClass('prevent-page-scroll');
    trigger_experience_view(parent);
}

// #
// sourceMappingURL=data:application/json;charset=utf8;base64,eyJ2ZXJzaW9uIjozLCJuYW1lcyI6W10sIm1hcHBpbmdzIjoiIiwic291cmNlcyI6WyJtYXJrdXAvY29tcG9uZW50cy9qaXZhLXNwYS1jYXJkcy9qaXZhLXNwYS1jYXJkcy1jb21wLmpzIl0sInNvdXJjZXNDb250ZW50IjpbIiQoIGRvY3VtZW50ICkucmVhZHkoIGZ1bmN0aW9uKCkge1xyXG4gICAgJCggJy5zaWduYXR1cmUtZXhwLXdyYXAnICkuc2hvd01vcmUoKTtcclxuICAgICQoICcuc3BhLWluZHVsZ2VuY2Utd3JhcCcgKS5zaG93TW9yZSgpO1xyXG4gICAgJCggJy5ib2R5LXNjcnViLXdyYXAnICkuc2hvd01vcmUoKTtcclxufSApOyJdLCJmaWxlIjoibWFya3VwL2NvbXBvbmVudHMvaml2YS1zcGEtY2FyZHMvaml2YS1zcGEtY2FyZHMtY29tcC5qcyJ9


document
        .addEventListener(
                'DOMContentLoaded',
                function() {

                   $('.footer-destination-expand-button').click(function(e) {
                        if ($(this).text().trim() == '+') {
                            $('.footer-destination-list').slideDown(100);
                            $(this).text('-');
                        } 
                        else {
                            $(this).text('+');
                            $('.footer-destination-list').slideUp(100);
                        }
					   e.stopImmediatePropagation();
                       return false;
                    });


                    $('.footer-tic-expand-button').click(function(e) {
                        if ($(this).find('button').text() == '+') {
                            $('.footer-brands-list').slideDown(100);
                            $(this).find('button').text('-');
                        } else {
                            $(this).find('button').text('+');
                            $('.footer-brands-list').slideUp(100);
                        }
                        e.stopImmediatePropagation();
                        return false;
                    });

                    if($('#scrollview')){
                        bindScrollFunction();
                    }

                    $('#newsletter').click(function() {

                    });
                    updateBrandSpecificSocialLinks();
                     //below code is for changing the tataneu related content

					updateFooterForTataNeu();
					 
					 
                    // The below function call is declared at dining-filter js
                    try {
                        populateFilterFromHtml();
                    } catch (e) {
                        // Dining filter is not available in the page
                        // console.log("The function[populateFilterFromHtml()]
                        // can't be called. Dining filter is not available in
                        // the page ")
                    }
                    toggleFooterPadding();
                });

function updateBrandSpecificSocialLinks() {
    var $pageContainer = $('.cm-page-container');
    var $facebookLink = $('.facebook-redirect');
    var $instagramLink = $('.instagram-redirect');
    var $twitterLink = $('.twitter-redirect');
    var $youtubeLink = $('.youtube-redirect')
    if ($pageContainer.hasClass('vivanta-theme')) {
        $facebookLink.attr('href', 'https://www.facebook.com/VivantaHotels');
        $instagramLink.attr('href', 'https://www.instagram.com/vivantahotels');
        $twitterLink.attr('href', 'https://twitter.com/vivantahotels');
        $youtubeLink.attr('href', 'https://www.youtube.com/user/VivantabyTaj');
    } else if ($pageContainer.hasClass('gateway-theme')) {
        $facebookLink.attr('href', 'https://www.facebook.com/TheGatewayHotel');
        $instagramLink.attr('href', 'https://www.instagram.com/thegatewayhotels');
        $twitterLink.attr('href', 'https://twitter.com/TheGatewayHotel');
        $youtubeLink.attr('href', 'https://www.youtube.com/user/TheGatewayHotel');
    }
}

function toggleFooterPadding(){
	if($('.book-ind-container').length!=0){
		$('.footer').addClass('footer-padding-for-cart-info');
	}
}

function bindScrollFunction(){
    $('.scrollview').click(function(){
        document.getElementById("scrollTarget").scrollIntoView();
    });

}

function updateFooterForTataNeu(){
 var userDetails =getUserData();
	if (userDetails && userDetails.loyalCustomer == 'Y') {
		var tataneuText = ['NeuPass Home', '', 'NeuPass Participating Hotels', ''];
		var tataneuLinks = ['https://www.tajhotels.com/en-in/neupass/', '', 'https://www.tajhotels.com/en-in/our-hotels/', '']
		$('.footer-brands-list li').each(function(index, value) {
			if (index == 0 || index == 2) {
				$(this).children().attr('href', tataneuLinks[index]);
				$(this).children().text(tataneuText[index]);
			}


		})
	}
}


$(document).ready(function() {
    $('.tic-help-freq-que-arrow').click(function() {
        $(this).toggleClass('tic-help-freq-que-arrow-exp');
        $(this).siblings('.tic-help-freq-que-ans').toggleClass('tic-help-freq-que-ans-exp');
    });
});
