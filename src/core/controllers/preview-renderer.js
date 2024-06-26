

function RenderMarkdown(dest, content) {
  // markdown basics
  dest.html(marked.parse(content));

  // codeblock
  dest.find("code").each(function () {
    if ($(this).hasClass("language-c++"))
      $(this).removeClass("language-c++").addClass("language-cpp");
  });

  // table
  dest.find("table").each(function () {
    $(this).addClass(
      "table table-bordered table-hover table-striped table-text-center"
    );
    $(this).wrap('<div class="table-responsive"></div>');
  });

  // image
  imgParseHtml(dest);

  // codeblock highlight
  Prism.highlightAll();

  // math
  let MathConfig = {
    delimiters: [
      { left: "$$", right: "$$", display: true },
      { left: "$", right: "$", display: false },
      { left: "\\(", right: "\\)", display: false },
      { left: "\\[", right: "\\]", display: true },
    ],
    throwOnError: false,
  };
  renderMathInElement(dest[0], MathConfig);
}
  