

var DateTool = {
    formateDate: function formateDate(val) {
        return val ? moment(val).format("YYYY-MM-DD") : '';

    },
    formateDateTime: function formateDateTime(val) {
        return val ? moment(val).format("YYYY-MM-DD HH:mm:ss") : '';
    },
}

$.ajaxSetup({cache:false});

var TableTool = {
    queryParams: function queryParams(params) {
        return {
            search: params.searchText,
            pageNumber: params.pageNumber,
            r: Math.random()
        };
    },
    resetTable: function resetTable(url) {
        $('#myTable').bootstrapTable("refresh", {url : url});
    }
};

var fileTool = {
    fileUpload: function fileUpload(url, field, oElement, cb, errCb) {
        var fileData = new FormData();
        fileData.append(field, oElement.files[0]);
        $.ajax({
            url: url,
            type: 'POST',
            data: fileData,
            processData: false, // 告诉jQuery不要去处理发送的数据
            contentType: false,  // 告诉jQuery不要去设置Content-Type请求头
            success: function success(data, textStatus, jqXHR) {
                console.log(data, '###');
                if (data.code == 200) {
                    cb(data);
                } else {

                }
            },
            error: function error(jqXHR, errInfo, e) {
                errCb(jqXHR);
            }
        });
    }
};

// function errorPlacement(error, element) {
//     if ($(element.parent()).hasClass('date')) {
//         error.appendTo(element.parent().parent());
//     } else {
//         error.appendTo(element.parent());
//     }
// }

// function uploadPics(span, multi) {
//     var id = span.id + "Upload";
//     $("#" + id).fileupload({
//         url: '/upload/image',
//         dataType: 'json',
//         autoUpload: true,
//         acceptFileTypes: /(\.|\/)(gif|jpe?g|png)$/i,
//         maxNumberOfFiles: 1,
//         maxFileSize: 5000000,
//         sequentialUploads: true,
//         add: function(e, data) {
//             var uploadErrors = [];
//             var acceptFileTypes = /(\.|\/)(gif|jpe?g|png)$/i;
//             //文件类型判断
//             if(data.originalFiles[0]['type'].length && !acceptFileTypes.test(data.originalFiles[0]['type'])) {
//                 uploadErrors.push('不支持文件类型');
//             }
//             //文件大小判断
//             if(data.originalFiles[0]['size'] > 5000000) {
//                 uploadErrors.push('文件超过5M');
//             }
//             if(uploadErrors.length > 0) {
//                 alert(uploadErrors.join("\n"));
//             } else {
//                 data.submit();
//             }
//         },
//         progressall: function (e, data) {
//             var progress = parseInt(data.loaded / data.total * 100, 10);
//             $('#progress' + span.id + ' .bar').css(
//                 'width',
//                 progress + '%'
//             );
//         }
//     }).bind('fileuploaddone', function (e, data) {
//         if ($("#" + span.id + "Text").text() === "上传") {
//             $("#" + span.id + "Text").text("重新上传");
//             var deleteHtml = '<span class="btn btn-default ml20"  onclick="removePics(this)">删除</span>';
//             if (multi) {
//                 $('#'+span.id).after(deleteHtml);
//                 picsNum += 1;
//                 addUploadBox(picsNum);

//             }
//         }
//         $("#" + span.id + "Img").attr("src", data.result.filePath);
//     });
// }

// function addUploadBox(num) {
//     var html = ' <div class="img-up-item">'
//         + '<div class="thumbnail">'
//         + '<img id="pics' + num + 'Img" class="thumb-img" data-holder-rendered="true" >'
//         + '<div class="caption" align="center">'
//         + '<span class="btn btn-primary fileinput-button" id="pics' + num + '" onclick="uploadPics(this,true)">'
//         + '<span id="pics' + num + 'Text" onclick=uploadPics(this,true)>上传</span>'
//         + '<input type="file" id="pics' + num + 'Upload" name="uploadImage" multiple>'
//         + '</span>'
//         + '<div id="progresspics' + num + '">'
//         + '<div class="bar" style="width: 0%;"></div>'
//         + '</div>'
//         + ' </div> </div> </div>';
//     $('#multiUpload').append(html);
// }

// function removePics(btn) {
//     $(btn).parent().parent().remove();
// }

function datePicker(beginSelector, endSelector) {
    // 仅选择日期
    $(beginSelector).datepicker(
        {
            language: "zh-CN",
            autoclose: true,
            startView: 0,
            format: "yyyy-mm-dd",
            clearBtn: true,
            todayBtn: false,
            endDate: new Date()
        }).on('changeDate', function (ev) {
        if (ev.date) {
            $(endSelector).datepicker('setStartDate', new Date(ev.date.valueOf()))
        } else {
            $(endSelector).datepicker('setStartDate', null);
        }
    });

    $(endSelector).datepicker(
        {
            language: "zh-CN",
            autoclose: true,
            startView: 0,
            format: "yyyy-mm-dd",
            clearBtn: true,
            todayBtn: false,
            endDate: new Date()
        }).on('changeDate', function (ev) {
        if (ev.date) {
            $(beginSelector).datepicker('setEndDate', new Date(ev.date.valueOf()))
        } else {
            $(beginSelector).datepicker('setEndDate', new Date());
        }
    })
}

function navSearch() {
    var keyword = $('#navSearchInput').val();
    if (keyword) {
        var url = "/search?keyword=" + keyword;
        window.open(encodeURI(url));
    }
}

function applyPrint() {
    $("#printArea").print({
        globalStyles: true,
        stylesheet : null,
        rejectWindow : true,
        noPrintSelector : ".no-print",
        iframe : true,
        append : null,
        prepend : null
    });
}

// 表单深层结构 name命名格式 xxx-xxx-xxx-...
function parseFormParams(id) {
    const params = {};
    $(id).find('[name]').each(function () {
        const attrs = $(this).attr('name').split('-');
        // 深层嵌套参数解析
        const _this = this;
        const paraseAttrs = function (params, index){
            if (index < attrs.length - 1) {
                if (!params[attrs[index]]) {
                    params[attrs[index]] = {};
                }
                paraseAttrs(params[attrs[index]], ++index);
            } else {
                params[attrs[index]] = $(_this).val();
                return;
            }
        }
        // 递归解析
        paraseAttrs(params, 0);
    });
    return params;
}

// 表单深层结构模板映射 name命名格式 xxx-xxx-xxx-...
function mappingFormTemplate(id, data) {
    const params = data;
    $(id).find('[name]').each(function () {
        const attrs = $(this).attr('name').split('-');
        // 深层嵌套参数解析
        const _this = this;
        const mappingTemplate = function (params, index){
            if (index < attrs.length - 1) {
                if (!params[attrs[index]]) {
                    params[attrs[index]] = {};
                }
                mappingTemplate(params[attrs[index]], ++index);
            } else {
                // params[attrs[index]] = $(_this).val();
                $(_this).val(params[attrs[index]]);
                return;
            }
        }
        // 递归解析
        mappingTemplate(params, 0);
    });
    return params;
}

// var URLTool = {};
// URLTool.getParam = function (paramName) {
//     var reg = new RegExp("(^|&)" + paramName + "=([^&]*)(&|$)");
//     var r = window.location.search.substr(1).match(reg);
//     if (r != null) return unescape(r[2]); return null;
// };



// function urlParam(name) {
//     var results = new RegExp('[\?&]' + name + '=([^&#]*)').exec(window.location.href);
//     if (results == null) {
//         return null;
//     }
//     else {
//         return results[1] || 0;
//     }
// }