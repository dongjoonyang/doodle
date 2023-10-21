/**
* =======================================
* 설  명 : 프로필 화면
* =======================================
*/
function fnProfileInitList(){
    $("#note").addClass("display-none");
    $(".horizonScroll").addClass("display-none");
    $(".navi-gradient").addClass("display-none");
    $(".navi-line").addClass("display-none");
}
/**
* =======================================7
* 설  명 : 네비게이션 헤더
* =======================================
*/
function fnCategoryInitList(){
    $.ajax({
        type : "get",
        url : "/category/data",
        dataType : "JSON"
    })
    .done(function(json){
        let info = '';
        //info += "<li><a href='/' class='active'>프로필</a></li>";
        for(i = 0; i < json.rows1.length ; i++){
            let data = json.rows1[i];
            info += "<li><a href='javascript:;' data-main-id='" + data.main_id + "'>"+ data.main_title +"</a></li>";
        };
        $("#mainCategory").append(info);

        /* 포트폴리오 메뉴 */
        $("#mainCategory li a").on("click", function(e){    
            let selfAcive = $(this).hasClass("active");
            $("#noteList").empty(); // 리스트 비우기
            
            // 서브 카테고리
            if(!selfAcive){
                $("#mainCategory li a").removeClass("active");
                $(this).addClass("active");
            }

            /* 프로필 숨김 및 리스트 숨김 해지 */
            $("#profile").addClass("display-none");
            $("#note").removeClass("display-none");
            $(".horizonScroll").removeClass("display-none");
            $(".navi-gradient").removeClass("display-none");
            $(".navi-line").removeClass("display-none");

            let mainId = $(this).data('mainId'); // 상단 카테고리
            let off = 0; // 받아올 데이터 시작 넘버

            fnMainCategory(mainId, off);
        });
    })
    .fail(function(xhr, status, errorThrown){
        console.log("카테고리 데이타 Ajax failed")
    });
    
}

/**
* =======================================
* 설  명 : 메뉴 클릭
* =======================================
*/
function fnMainCategory(mainId, off){
    if(mainId != undefined){
        $.ajax({
            type : "get",
            url : "/main/" + mainId + "/off/" + off,
            dataType : "JSON"
        })
        .done(function(json){
            fnNoteCate(json);
            fnNoteList(json); // 리스트 목록
            fnMainInfinityScroll(json); // 스크롤 시 데이터 호출
        })
        .fail(function(xhr, status, errorThrown){
            console.log("게시판 및 카테고리 Ajax failed")
        });
    }
}

/**
* =======================================
* 설  명 : 서브 카테고리
* =======================================
*/
function fnNoteCate(json){
    let notefolioCate= ""; // 카테고리
    $("#subCategory").empty(); // 카테고리 비우기
    
    if(json.mainId == 1){
        notefolioCate += "<a href='javascript:;' class='active horizonScroll__item' data-main-id=" + json.mainId + "><span class='horizonScroll__itemText'>All</span></a>";
    }else{
        notefolioCate += "<a href='javascript:;' class='active horizonScroll__item' data-main-id=" + json.mainId + "><span class='horizonScroll__itemText'>All</span></a>";
    }

    /* 서브 카테고리 */
    for(i = 0; i < json.rows2.length ; i++){
        let data = json.rows2[i];
        if(data.main_id == json.mainId){
            notefolioCate += "<a href='javascript:;' class='horizonScroll__item' data-main-id=" + data.main_id + "  data-sub-id=" + data.sub_id + "><span class='horizonScroll__itemText'>" + data.sub_title + "</span></a>";
        }
    };

    $("#subCategory").append(notefolioCate);

    /* 슬라이드 */
    fnCategorySlider();   
}


/**
* =======================================
* 설  명 : 서브 카테고리 슬라이드 
* =======================================
*/
function fnCategorySlider(){
    var $scrItem = $('.horizonScroll__item');
    var scrIWidth = 0;
    for (var i=0; i<$scrItem.length; i++) {
        scrIWidth += $scrItem.eq(i).outerWidth();
    }
    $('.horizonScroll__wrapper').css('width',scrIWidth)
    $scrItem.click(function(){
        var target = $(this); 
        $scrItem.removeClass('active')
        target.addClass('active');
        muCenter(target);
    })
    function muCenter(target){
        var box = $('.horizonScroll');
        var boxItem = box.find('.horizonScroll__item');
        var boxHarf = box.width()/2;
        var pos;
        var listWidth=0;
        var targetLeft = 0;

        boxItem.each(function(){ listWidth += $(this).outerWidth(); })    
        
        for (var i=0; i<target.index(); i++) targetLeft += boxItem.eq(i).outerWidth();
        
        var selectTargetPos = (targetLeft + target.outerWidth()/2);
        if (selectTargetPos <= boxHarf) {
            pos = 0;
        }else if (listWidth - selectTargetPos <= boxHarf) {
            pos = listWidth-box.width();
        }else {
            pos = selectTargetPos - boxHarf;
        }
        
        setTimeout(function(){
            box.animate({scrollLeft:pos},300)
        }, 200);
    }


    /* 터치 스크롤 */
    fnPcTouchSlider();
}

/**
* =======================================
* 설  명 : PC버젼 모바일 버젼과 동일하게 서브 카테고리 터치 슬라이드
* =======================================
*/
function fnPcTouchSlider(){
    let slider = $(".horizonScroll");
    let isDown = false;
    let startX;
    let scrollLeft;

    slider.mousedown(function(e) {
        isDown = true;
        startX = e.pageX - slider.offset().left;
        scrollLeft = slider.scrollLeft();    
    });

    slider.mouseleave(function() {
        isDown = false;
    })
    
    slider.mouseup(function() {
        isDown = false;
    })

    slider.mousemove(function(e) {
        if (!isDown) return; 
        e.preventDefault();
        let x = e.pageX - slider.offset().left;
        let walk = x - startX;
        slider.scrollLeft(scrollLeft - walk);
    })
}


/**
* =======================================
* 설  명 : 서브 리스트
* =======================================
*/
function fnNoteList(json){
    let notefolio= ""; // 리스트   

    let isData = JSON.stringify(json.rows3.length);

    // 데이터가 없을시
    if(isData == 0) {
        // 로딩 이미지 숨김처리
        $('.scroll-observer').removeClass('on');
        return ;
    } else {
        $('.scroll-observer').addClass('on');
    }

    /* 전체 리스트 데이터 추출 */
    for(let i = 0; i <= json.rows3.length; i++){
        if(i > json.length){
            i++;
        }else{
            let data = json.rows3[i];
            console.log(data);
            notefolio += "<div class='note-item' data-idx=" + data.idx + " data-main-id=" + data.main_id + "  data-sub-id=" + data.sub_id + " data-title=" + data.title + " data-sub-title=" + data.sub_title +">";
            notefolio += "<a href='javascript:;'>";
            notefolio += "<div class='note-img'>";
            notefolio += "<img src='"+ data.image +"'>";
            notefolio += "</div>";
            notefolio += "<div class='note-info'>";
            notefolio += "<p>"+ data.title +"</p>";
            notefolio += "<p>"+ "Format : " + data.sub_title +"</p>";
            notefolio += "</div>";
            notefolio += "</a>";
            notefolio += "</div>";
        }
    }

    $("#noteList").append(notefolio);

    // 로드 데이터가 없을시
    let isItem = $(".note-item").length;
    console.log(typeof isItem)
}

/**
* =======================================
* 설  명 : 바닥 감지 이벤트(All 카테고리)
* =======================================
*/
function fnMainInfinityScroll(json) {
    let mainId = $("#subCategory .active").data("mainId");
    let noteLastItem = document.querySelector('.note-item:last-child');

    const lastCardObserver = new IntersectionObserver(entries => {
        const lastCard = entries[0];

        if(!lastCard.isIntersecting) return;

        // 데이터 불러오기
        if(json.length !== -1) {
            off = json.off + 5;
            $.ajax({
                type : "get",
                url : "/main/" + mainId + "/off/" + off,
                dataType : "JSON",
            })
            .done(function(json){
                lastCardObserver.unobserve(lastCard.target);
                fnNoteList(json);
                fnMainInfinityScroll(json)
            })
            .fail(function(request, status, error){
                console.log("페이징 불러오기 Ajax failed");
            });
        } 
        // else {
        //     $("#scroll-observer").removeClass('on');
        // }
        if(noteLastItem === null) return;
        lastCardObserver.observe(document.querySelector('.note-item:last-child'));
        
    },{})

    if(noteLastItem === null) return;
    lastCardObserver.observe(document.querySelector('.note-item:last-child'));
}

/**
* =======================================
* 설  명 : 바닥 감지 이벤트(Sub 카테고리)
* =======================================
*/
function fnSubInfinityScroll(json) {
    let mainId = $("#subCategory .active").data("mainId");
    let subId = $("#subCategory .active").data("subId");
    let noteLastItem = document.querySelector('.note-item:last-child');

    const lastCardObserver = new IntersectionObserver(entries => {
        const lastCard = entries[0];

        if(!lastCard.isIntersecting) return;

        // 데이터 불러오기
        if(json.length !== -1) {
            off = json.off + 5;
            $.ajax({
                type : "get",
                url : "/main/" + mainId + "/sub/" + subId + "/off/" + off,
                dataType : "JSON"
            })
            .done(function(json){
                lastCardObserver.unobserve(lastCard.target)
                fnNoteList(json);
                fnSubInfinityScroll(json); // 스크롤 시 데이터 호출
            })
            .fail(function(xhr, status, errorThrown){
                console.log("서브 게시판 및 카테고리 Ajax failed")
            });   
        } 
        // else {
        //     $("#scroll-observer").removeClass('on');
        // }
        if(noteLastItem === null) return;
        lastCardObserver.observe(document.querySelector('.note-item:last-child'))
    },{})
    if(noteLastItem === null) return;
    lastCardObserver.observe(document.querySelector('.note-item:last-child'))
}


$(function() {
    fnCategoryInitList(); // 상단 헤더
    fnProfileInitList(); // 프로필 화면

    /**
    * =======================================
    * 설  명 : 서브 카테고리 슬라이드 리사이즈
    * =======================================
    */
    $(window).resize(function() {
        var $scrItem = $('.horizonScroll__item');
        var scrIWidth = 0;

        setTimeout(function(){
            for (var i=0; i<$scrItem.length; i++) {
                scrIWidth += $scrItem.eq(i).outerWidth();
            }
            $('.horizonScroll__wrapper').css('width',scrIWidth)
        },300);
    });

    /**
    * =======================================
    * 설  명 : 서브 카테고리 클릭
    * =======================================
    */
    $(document).on("click", "#subCategory a", function(){
        let mainId = $(this).data("mainId");
        let subId = $(this).data("subId");
        let selfAcive = $(this).hasClass("active");

        // 서브 카테고리
        if(!selfAcive){
            $("#subCategory a").removeClass("active");
            $(this).addClass("active");
        }

        // 서브 목록 지우기
        $("#noteList").empty();

        if(subId == undefined){
            let off = 0; // offset 초기화
            $.ajax({
                type : "get",
                url : "/main/" + mainId + "/off/" + off,
                dataType : "JSON"
            })
            .done(function(json){
                fnNoteList(json);
                fnMainInfinityScroll(json); // 스크롤 시 데이터 호출
            })
            .fail(function(xhr, status, errorThrown){
                console.log("메인 게시판 및 카테고리 Ajax failed")
            });
        }else{
            let off = 0; // offset 초기화
            $.ajax({
                type : "get",
                url : "/main/" + mainId + "/sub/" + subId + "/off/" + off,
                dataType : "JSON"
            })
            .done(function(json){
                fnNoteList(json);
                fnSubInfinityScroll(json)
            })
            .fail(function(xhr, status, errorThrown){
                console.log("서브 게시판 및 카테고리 Ajax failed")
            });
        }
    })

    /**
    * =======================================
    * 설  명 : 팝업 오픈
    * =======================================
    */
    $(document).on("click", ".note-item", function(){
        $(".layer-n").css("display","flex"); 
        $(".pop-area").empty();
        $("#popConName").empty();
        $("#popConCategory").empty();
        $("html").addClass("overflow-hidden");

        
        let idx = $(this).data("idx");
        let mainId = $(this).data("mainId");
        let subId = $(this).data("subId");
        let title = $(this).data("title");
        let subTitle = $(this).data("subTitle");

        $("#popConName").append(title);
        $("#popConCategory").append(subTitle);

        $.ajax({
            type : "get",
            url : "/" + idx + "/" + mainId + "/" + subId,
            dataType : "JSON"
        })
        .done(function(json){
            /* 데이터 추출 */
            let notefolioData = "";
            notefolioData += json.rows[0].content;         
            $(".pop-area").append(notefolioData);

        })
        .fail(function(xhr, status, errorThrown){
            console.log("서브 게시판 및 카테고리 Ajax failed")
        });

    })

    /**
    * =======================================
    * 설  명 : 팝업 닫기
    * =======================================
    */
    $(".layer-n .pop-close").on( "click", function(e) { /*.layer-n .bg : bg로 닫기 제거 */
		// $(this).closest(".layer-n").fadeOut();
        $(this).closest(".layer-n").css("display","none");
        $("html").removeClass("overflow-hidden");
	});

    /**
    * =======================================
    * 설  명 : 모드변경(다크,라이트), 로컬 스토리지 저장
    * =======================================
    */
    const isUserColorTheme = localStorage.getItem('color-theme');

    if(isUserColorTheme === "dark"){
        localStorage.setItem("color-theme", "dark");
        $("html").attr("color-theme", "dark");
        $("#modeChk").attr("checked", true);
    }else{
        localStorage.setItem('color-theme', 'light');
        $("html").attr("color-theme", "light");
    }

    $("#modeChk").on("click", function(e){
        if(e.target.checked){
            localStorage.setItem("color-theme", "dark");
            $("html").attr("color-theme", "dark");
        }else{
            localStorage.setItem("color-theme", "light");
            $("html").attr("color-theme", "light");
        }
    });
});
