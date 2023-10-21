const db_config = require('../../config/mysql');
const conn = db_config.init(); // connect

let Manage = function (){}; // 생성자

// 카테고리 쿼리
Manage.manageData = function(mainId,result){
    let query1 = "SELECT * FROM main_category;";
    let query2 = "SELECT * FROM sub_category;";
    // 게시판
    let query3 = "SELECT b.idx, b.image, b.title, b.content, date_format(b.regdate, '%Y-%m-%d %H:%i:%s') regdate, date_format(b.modidate, '%Y-%m-%d %H:%i:%s') modidate, b.main_id, b.sub_id, s.sub_id, s.sub_title, s.main_id, m.main_id, m.main_title FROM board b INNER JOIN sub_category s ON b.sub_id = s.sub_id INNER JOIN main_category m ON m.main_id = s.main_id where b.main_id = ?";

    conn.query(query1 + query2 + query3, [mainId], function(err, res){
        if(err){
            result(null, err);
        } else {
            let res1 = res[0];
            let res2 = res[1];
            let res3 = res[2];
            result(null, res1, res2, res3);
        }
    });
};

// 카테고리 쿼리
Manage.manageCategoryData = function(result){
    let query1 = "SELECT * FROM main_category;";
    let query2 = "SELECT * FROM sub_category;";
    
    conn.query(query1 + query2, function(err, res){
        if(err){
            result(null, err);
        } else {
            let res1 = res[0];
            let res2 = res[1];
            result(null, res1, res2);
        }
    });
};

// 카테고리 등록
Manage.manageCategoryProcess = function(subTitle, mainId, result){
    let insert = "INSERT INTO sub_category (sub_title, main_id) VALUES(?,?);";
    let autoIncrement = "ALTER TABLE sub_category auto_increment = 0; SET @COUNT = 0; UPDATE sub_category SET sub_id = @COUNT:=@COUNT+1;"; 

    conn.query(insert + autoIncrement, [subTitle, mainId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 카테고리 타이틀 수정
Manage.manageCategoryTitleUpdateProcess = function(mngCategoryOwnTitle, mngCategoryTwoTitle, mngCategoryId, result){
    let mainId = mngCategoryId;

    if(mainId === "1"){ 
        mainTitle = mngCategoryOwnTitle;
    }else if(mainId === "2"){
        mainTitle = mngCategoryTwoTitle;
    }
    
    conn.query("update main_category set MAIN_TITLE = ? where main_id = ?", [mainTitle, mainId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};


// 카테고리 수정
Manage.manageCategoryUpdateProcess = function(subTitle, subId, result){
    conn.query("update sub_category set SUB_TITLE = ? where sub_id = ?", [subTitle, subId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 카테고리 삭제
Manage.manageCategoryDeleteProcess =  function(id, result){
    conn.query("delete from sub_category where sub_id = ?", id, function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 메인 게시판 목록 불러오기
Manage.manageMainBoardData = function(mainId, result){
    let query = "SELECT b.idx, b.image, b.title, b.content, date_format(b.regdate, '%Y-%m-%d %H:%i:%s') regdate, date_format(b.modidate, '%Y-%m-%d %H:%i:%s') modidate, b.main_id, b.sub_id, s.sub_id, s.sub_title, s.main_id, m.main_id, m.main_title FROM board b INNER JOIN sub_category s ON b.sub_id = s.sub_id INNER JOIN main_category m ON m.main_id = s.main_id where b.main_id = ?";


    conn.query(query, [mainId], function(err, res){
        if(err){
         result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 서브 게시판 목록 불러오기
Manage.manageSubBoardData = function(mainId, subId, result){
    let query = "SELECT b.idx, b.image, b.title, b.content, date_format(b.regdate, '%Y-%m-%d %H:%i:%s') regdate, date_format(b.modidate, '%Y-%m-%d %H:%i:%s') modidate, b.main_id, b.sub_id, s.sub_id, s.sub_title, s.main_id, m.main_id, m.main_title FROM board b INNER JOIN sub_category s ON b.sub_id = s.sub_id INNER JOIN main_category m ON m.main_id = s.main_id where b.main_id = ? and b.sub_id = ?";

    conn.query(query, [mainId, subId], function(err, res){
        if(err){
         result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 인덱스 리셋
Manage.manageNumReset = function(result){
    let query1 = "SET @num := 0;" ;
    let query2 = "UPDATE board SET idx = @num := (@num+1);";
    let query3 = "ALTER TABLE board AUTO_INCREMENT =1;";

    conn.query(query1 + query2 + query3, function(err, res){
        if(err){
           console.log(err);
        }
    });
};

module.exports = Manage;