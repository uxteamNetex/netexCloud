var zTree;
var demoIframe;

var setting = {
    view: {
        dblClickExpand: false,
        showLine: false,
        selectedMulti: false
    },
    data: {
        simpleData: {
            enable:true,
            idKey: "id",
            pIdKey: "pId",
            rootPId: ""
        }
    },
    callback: {
        beforeClick: function(treeId, treeNode) {
            var zTree = $.fn.zTree.getZTreeObj("tree");
            if (treeNode.isParent) {
                zTree.expandNode(treeNode);
                return false;
            } else {
                demoIframe.attr("src",treeNode.file + ".html");
                return true;
            }
        }
    }
};

var zNodes = [
    {id:4, pId:0, name:"14. SALTOKI REUS S.A.", open:false},
        {id:401, pId:4, name:"One-time Large Data Loading", file:"bigdata/common"},
        {id:402, pId:4, name:"Loading Data in Batches", file:"bigdata/diy_async"},
        {id:403, pId:4, name:"Loading Data By Pagination", file:"bigdata/page"},
    {id:6, pId:0, name:"Phase II (CPM - Bus)", open:false},
        {id:601, pId:6, name:"hide ordinary node", file:"exhide/common"},
        {id:602, pId:6, name:"hide with checkbox mode", file:"exhide/checkbox"},
        {id:603, pId:6, name:"hide with radio mode", file:"exhide/radio"}
];

$(document).ready(function(){
    var t = $("#tree");
    t = $.fn.zTree.init(t, setting, zNodes);
    demoIframe = $("#testIframe");
    demoIframe.bind("load", loadReady);
    var zTree = $.fn.zTree.getZTreeObj("tree");
    zTree.selectNode(zTree.getNodeByParam("id", 101));
});

function loadReady() {
    var bodyH = demoIframe.contents().find("body").get(0).scrollHeight,
    htmlH = demoIframe.contents().find("html").get(0).scrollHeight,
    maxH = Math.max(bodyH, htmlH), minH = Math.min(bodyH, htmlH),
    h = demoIframe.height() >= maxH ? minH:maxH ;
    if (h < 530) h = 530;
    demoIframe.height(h);
}

//Añadimos el componente de puntos suspensivos en los nombres de los grupos
$(document).ready(function(){
    loadTextEllipsis(); 
    function loadTextEllipsis() {
        $('span.node_name').closest('a').addClass('ellipsis-points ellipsis-points-2');
        $('span.node_name').addClass('textellipsis');
    }
    $('.ztree li').click(function(){        
        setTimeout(function(){
            //Cargamos las clases del ellipsis:
            loadTextEllipsis();
            //Redimensionamos de nuevo los ellipsis de la página.
            RedimMaterialCards();
        },0);  //Le damos un poco de holgura para que no haga inmediato al click, sino que espere x ms      
    });
    //Cargamos la funcion al redimensionar la ventana del navegador
    $(window).resize(function(){       
        setTimeout(function(){
            loadTextEllipsis(); 
            RedimMaterialCards();
        },410);  //Le damos un poco de holgura para que no haga inmediato al click, sino que espere x ms      
    });
});

//Al clicar en un grupo el scroll sube
$(document).ready(function(){
    var tabHeight = $(".tabs-wrapper").height();
    var searchHeight = $(".toolbar").height();
    $('.ztree li').click(function(){        
        $("html, body").animate({scrollTop: tabHeight + searchHeight}, "slow");   
    });
});