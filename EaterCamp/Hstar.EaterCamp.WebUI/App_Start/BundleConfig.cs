using System.Web.Optimization;

namespace Hstar.EaterCamp.WebUI
{
    public class BundleConfig
    {
        // 有关 Bundling 的详细信息，请访问 http://go.microsoft.com/fwlink/?LinkId=254725
        public static void RegisterBundles(BundleCollection bundles)
        {
            //jquery插件
            bundles.Add(new ScriptBundle("~/bundles/jquery").Include(
                        "~/Scripts/Plugins/jQuery/jquery-{version}.js"));
            //bootstrap插件
            bundles.Add(new ScriptBundle("~/bundles/bootstrap").Include(
                "~/Scripts/Plugins/bootstrap/js/bootstrap.js"));
            bundles.Add(new StyleBundle("~/Scripts/Plugins/bootstrap/css/css").Include(
                "~/Scripts/Plugins/bootstrap/css/bootstrap.css",
                "~/Scripts/Plugins/bootstrap/css/bootstrap-theme.css"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryui").Include(
                        "~/Scripts/Plugins/jQueryUI/jquery-ui-{version}.js"));

            bundles.Add(new ScriptBundle("~/bundles/jqueryval").Include(
                "~/Scripts/Plugins/jQueryValidate/jquery.validate*",
                "~/Scripts/Plugins/jQueryValidate/jquery.unobtrusive*",
                "~/Scripts/Plugins/jQueryAjax/jquery.unobtrusive*"));

            // 使用 Modernizr 的开发版本进行开发和了解信息。然后，当你做好
            // 生产准备时，请使用 http://modernizr.com 上的生成工具来仅选择所需的测试。
            bundles.Add(new ScriptBundle("~/bundles/modernizr").Include(
                        "~/Scripts/modernizr-*"));

            bundles.Add(new StyleBundle("~/Content/css").Include("~/Content/site.css"));

            bundles.Add(new StyleBundle("~/Scripts/css").Include("~/Scripts/Plugins/bootstrap/css/bootstrap.min.css"));

            bundles.Add(new StyleBundle("~/Content/themes/base/css").Include(
                        "~/Content/themes/base/jquery.ui.core.css",
                        "~/Content/themes/base/jquery.ui.resizable.css",
                        "~/Content/themes/base/jquery.ui.selectable.css",
                        "~/Content/themes/base/jquery.ui.accordion.css",
                        "~/Content/themes/base/jquery.ui.autocomplete.css",
                        "~/Content/themes/base/jquery.ui.button.css",
                        "~/Content/themes/base/jquery.ui.dialog.css",
                        "~/Content/themes/base/jquery.ui.slider.css",
                        "~/Content/themes/base/jquery.ui.tabs.css",
                        "~/Content/themes/base/jquery.ui.datepicker.css",
                        "~/Content/themes/base/jquery.ui.progressbar.css",
                        "~/Content/themes/base/jquery.ui.theme.css"));
        }
    }
}