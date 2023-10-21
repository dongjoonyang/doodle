const express = require('express'); 
const router = express.Router();
const multer = require('multer'); // multer
const BoardController = require('../../controllers/admin/boardController');
const fs = require('fs'); // file 생성시 필요

/**
* =======================================
* 설  명 : uploads 폴더 생성
* =======================================
*/ 
// 폴더 없을시 생성
let dir = './public/uploads';
if (!fs.existsSync(dir)){
  fs.mkdirSync(dir);
}

/**
* =======================================
* 설  명 : multer 파일 생성 연결
* =======================================
*/
const storage = multer.diskStorage({
  destination:  (req, file, cb) => {
    cb(null, './public/uploads') // 경로 설정
  },
  filename:  (req, file, cb) => {
    cb(null, Date.now() + '-' + file.originalname)// 파일 원본이름 저장
  }
})

const fileFilter = (req, file, cb) => {
  const typeArray = file.mimetype.split('/');
  const fileType = typeArray[1];

  if (fileType == 'jpg' || fileType == 'png' || fileType == 'jpeg' || fileType == 'gif' || fileType == 'webp') {
      req.fileValidationError = null;
      cb(null, true);
  } else {
      req.fileValidationError = "jpg,jpeg,png,gif,webp 파일만 업로드 가능합니다.";
      cb(null, false)
  }
}

const upload = multer({ storage: storage, fileFilter: fileFilter }); // 미들웨어 생성
/**
* =======================================
* 설  명 : 게시판 라우터 
* =======================================
*/
/* Default url : admin/board */ 
/* 게시판 글쓰기 페이지 */
router.get('/boardAdd/:mainId/:subId', function(req, res, next){ 
    let main = req.params.mainId;
    let sub = req.params.subId;

    res.render('admin/manageAdd', {
        mainId : main, 
        subId : sub
    });
});

/* 게시판 글 등록 */
router.post('/boardAddProcess', upload.single("userfile"), 
  function (req, res) {
    if(req.fileValidationError === null){
      BoardController.boardAddProcess(req, res);
    }else{
      console.log("파일을 선택해주세요.");
    }
  }
);

/* 게시판 에디터 이미지 등록 */
router.post('/uploads', upload.single("summerfile"), BoardController.boardImage);

/* 게시판 글 읽기 */
router.get('/boardRead/:idx/:mainId/:subId', BoardController.boardRead);

/* 게시판 글 수정 */
router.post('/boardUpdateProcess', upload.single("userfile"), BoardController.boardUpdateProcess);

/* 게시판 글 삭제 */
router.get('/boardDelete/:idx', BoardController.boardDelete);

module.exports = router;