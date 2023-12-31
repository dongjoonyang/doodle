/**
* =======================================
* 설  명 : 데이터베이스 Mysql
* =======================================
*/
const db_config = require('../../config/mysql');
const conn = db_config.init(); // connect

let User = function (){}; // 생성자


// 카테고리 쿼리
User.manageData = function(mainId, off, result){
    let query1 = "SELECT * FROM main_category;";
    let query2 = "SELECT * FROM sub_category;";
    //let query3 = `SELECT * FROM board WHERE main_id = ? LIMIT 5 OFFSET ${off}`;
    let query3 = `SELECT b.idx, b.image, b.title, b.content, date_format(b.regdate, '%Y-%m-%d %H:%i:%s') regdate, date_format(b.modidate, '%Y-%m-%d %H:%i:%s') modidate,
                  b.main_id, b.sub_id, s.sub_id, s.sub_title, s.main_id FROM board b INNER JOIN sub_category s ON b.sub_id = s.sub_id where s.main_id = ? LIMIT 5 OFFSET ${off}`;

    conn.query(query1 + query2 + query3, [mainId, off], function(err, res){
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
User.categoryData = function(result){
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

// 서브 게시판 목록 불러오기
User.subBoardData = function(mainId, subId, off, result){
    //let query = `SELECT * FROM board WHERE main_id = ? and sub_id = ? LIMIT 5 OFFSET ${off}`;
    let query = `SELECT b.idx, b.image, b.title, b.content, date_format(b.regdate, '%Y-%m-%d %H:%i:%s') regdate, date_format(b.modidate, '%Y-%m-%d %H:%i:%s') modidate,
                  b.main_id, b.sub_id, s.sub_id, s.sub_title, s.main_id FROM board b INNER JOIN sub_category s ON b.sub_id = s.sub_id where s.main_id = ? and b.sub_id = ? LIMIT 5 OFFSET ${off}`;

    conn.query(query, [mainId, subId, off], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res);
        }
    });
};

// 게시판 글 읽기
User.boardRead = function(idx, mainId, subId, result){
    let select = "SELECT * FROM board WHERE idx = ? AND main_id = ? AND sub_id = ?;";
    conn.query(select, [idx, mainId, subId], function(err, res){
        if(err){
            result(null, err);
        } else {
            result(null, res)
        }
    });
}


module.exports = User;

