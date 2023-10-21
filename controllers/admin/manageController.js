const Manage = require("../../models/admin/manage");

// 카테고리 메인 리스트 및 메인 게시판 컨트롤러
exports.manageData = function(req, res){
    if(req.session.author !== undefined){
        let mainId = req.params.mainId;
        let page = req.params.page;
        
        Manage.manageData(mainId, function(err, result1, result2, result3){
            if(err){
                res.send(err);
            } else {
                res.render('admin/manage', {
                    // 카테고리
                    rows1 : result1,
                    rows2 : result2,
                    // 게시판
                    rows3 : result3,
                    length : result3.length - 1, // 페이지 넘어갈때를 대비한 수
                    // 서브타이틀
                    page : page, // page 번호
                    page_num : 5 // 페이지 행 수
                }); 
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 카테고리 관리 컨트롤러
exports.manageCatgoryData = function(req, res){
    if(req.session.author !== undefined){
        Manage.manageCategoryData(function(err, result1, result2){
            if(err){
                res.send(err);
            } else {
                res.json({
                    rows1 : result1, 
                    rows2 : result2
                });
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 카테고리 등록 컨트롤러
exports.manageCategory = function(req, res){
    if(req.session.author !== undefined){
        let subTitle = req.body.categoryName;
        let mainId = req.body.categoryKinds;

        Manage.manageCategoryProcess(subTitle, mainId, function(err, result){
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 카테고리 타이틀 수정 컨트롤러
exports.manageCategoryTitleUpdate = function(req, res){
    if(req.session.author !== undefined){
        let mngCategoryOwnTitle = req.body.mngCategory1;
        let mngCategoryTwoTitle = req.body.mngCategory2;
        let mngCategoryId = req.body.mngCategoryId;

        Manage.manageCategoryTitleUpdateProcess(mngCategoryOwnTitle, mngCategoryTwoTitle, mngCategoryId, function(err, result){
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 카테고리 수정 컨트롤러
exports.manageCategoryUpdate = function(req, res){
    if(req.session.author !== undefined){
        let subId = req.body.categorySubId;
        let subTitle = req.body.categoryName;

        Manage.manageCategoryUpdateProcess(subTitle, subId, function(err, result){
            if (err) {
                res.send(err);
            } else {
                res.json(result);
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 카테고리 삭제 컨트롤러
exports.manageCategoryDelete = function(req, res){
    if(req.session.author !== undefined){
        let id = req.params.id;
        Manage.manageCategoryDeleteProcess(id, function(err, result){
            if (err) {
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 메인 게시판 목록 불러오기 컨트롤러
exports.manageMainBoardData = function(req, res){
    if(req.session.author !== undefined){
        let mainId = req.params.mainId;
        let page = req.params.page;

        Manage.manageMainBoardData(mainId, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.send({
                    rows : result,
                    page : page, 
                    length : result.length - 1,
                    page_num : 5,
                    category : "main"
                });
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
}

// 서브 게시판 목록 불러오기 컨트롤러
exports.manageSubBoardData = function(req, res){
    if(req.session.author !== undefined){
        let mainId = req.params.mainId;
        let subId = req.params.subId;
        let page = req.params.page;

        Manage.manageSubBoardData(mainId, subId, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.send({
                    rows : result,
                    page : page, 
                    length : result.length - 1,
                    page_num : 5,
                    category : "sub"
                });
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
}

// 테이블 순번(인덱스) 초기화
exports.manageNumReset = function(req, res){
    if(req.session.author !== undefined){
        Manage.manageNumReset("",function(err, result){
            if(err){
                res.send(err);
            } else {
                res.send(result);
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
}