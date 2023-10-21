const Board = require("../../models/admin/board");

// 글 등록 컨트롤러
exports.boardAddProcess = function(req, res){
    if(req.session.author !== undefined){
        let imgurl = '';
        let mainId = req.body.mainId;
        let subId = req.body.subId;
        let title = req.body.title;
        let contents = req.body.contents;

        if(req.file !== undefined) {
            imgurl = req.file.path;
            imgurl = imgurl.substr(6);
        }

        Board.boardAddProcess(imgurl, mainId, subId, title, contents, function(err, result){
            if (err) {
                res.send(err);
            } else {
                res.json({
                    result : result,
                    mainId : mainId, 
                    subId : subId
                });
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 글 에디터 사진 등록 컨트롤러
exports.boardImage = function(req, res){
    if(req.session.author !== undefined){
        let imgurl = '';
        if(req.file !== undefined) {
            imgurl = req.file.path;
            imgurl = imgurl.substr(6);
        }
        res.json(imgurl); 
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 글 상세 컨트롤러
exports.boardRead = function(req, res){
    if(req.session.author !== undefined){
        let idx = req.params.idx;
        let mainId = req.params.mainId;
        let subId = req.params.subId;

        Board.boardRead(idx, mainId, subId, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.render("admin/manageMod", {
                    idx : idx,
                    mainId : mainId,
                    subId : subId,
                    rows : result
                })
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 글 수정 컨트롤러
exports.boardUpdateProcess = function(req, res){
    if(req.session.author !== undefined){
        let imgurl = '';
        let idx = req.body.idx;
        let mainId = req.body.mainId;
        let subId = req.body.subId;
        let title = req.body.title;
        let contents = req.body.contents;
        let currentImgurl = req.body.imgUrl;// 등록 저장 되어있는 이미지

        if(req.file !== undefined) {
            imgurl = req.file.path;
            imgurl = imgurl.substr(6);
        }else{
            imgurl = currentImgurl;
        }

        Board.boardUpdateProcess(idx, imgurl, mainId, subId, title, contents, function(err, result){
            if(err){
                res.send(err);
            } else {
                res.json({
                    result : result,
                    mainId : mainId, 
                    subId : subId
                });
            }
        });
    }else{
        res.writeHead(200, {'Content-Type': 'text/html; charset=utf-8'});
        res.write("<script>alert('로그인 해주세요.')</script>");
        res.write("<script>window.location=\"/admin\"</script>");
    }
};

// 글 삭제 컨트롤러
exports.boardDelete = function(req, res){
    if(req.session.author !== undefined){
        let paramsIdx = req.params.idx;

        let idxArr = new Array();
        idxArr = paramsIdx.split(",");

        let queryStr = "";
        for(let i = 0; i < idxArr.length; i++){
            if(queryStr) queryStr += ",";
            queryStr += "?";
        }

        Board.boardDelete(idxArr, queryStr, function(err, result){
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
};

