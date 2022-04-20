// [ツイート]ボタン押下
function btnClick_ReadTweat(id, title) {
  $.ajax({
    type: "GET",
    url: "/home_release_update/" + id,
  })
    .done(function (data, textStatus, jqXHR) {
      url = "https://runcheck.homisoftware.net/youyou-tweat?id=" + id
      window.location.href =
        "https://twitter.com/intent/tweet?text=" + title + " " + url
    })
    .fail(function (jqXHR, textStatus, errorThrown) {})
}

// [削除]ボタン押下
function btnClick_ReadDelete(id) {
  window.location.href = "/home_destroy/" + id
}

// 削除警告文
function deleteConfirm(title) {
  return confirm("「" + title + "」を削除します。\nよろしいですか?")
}

$(function ($) {
  $("#serach_category").change(function () {
    home_change()
  })

  function home_change() {
    jQuery(".comparison_group").each(function (i) {
      category = jQuery(this).find(".card-text").val()
      video_type = jQuery(this).find(".video_type_value").val()
      if (
        category.indexOf($("#serach_category").val()) > -1 &&
        video_type.indexOf($("#serach_video_type").val()) > -1
      ) {
        jQuery(this).show()
      } else {
        jQuery(this).hide()
      }
    })
  }

  $("#serach_video_type").change(function () {
    home_change()
  })
})
