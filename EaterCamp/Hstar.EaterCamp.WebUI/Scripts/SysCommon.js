var SysCommon = {
    /*切换顶部活动菜单公共方法*/
    changeActiveMenu: function (menuIdx) {
        var $activeMenu = $('#menu_bar li:eq(' + menuIdx + ')');
        $activeMenu.addClass('active').siblings().removeClass('active');
    }
};