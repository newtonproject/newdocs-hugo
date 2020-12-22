'use strict';

(function () {
  const indexCfg = {{ with i18n "newdocsSearchConfig" }}
    {{ . }};
  {{ else }}
   {};
  {{ end }}

  indexCfg.doc = {
    id: 'id',
    field: ['title', 'content'],
    store: ['title', 'href', 'section'],
  };

  const index = FlexSearch.create('balance', indexCfg);
  window.newdocsSearchIndex = index;

  {{- $pages := where .Site.Pages "Kind" "in" (slice "page" "section") -}}
  {{- $pages = where $pages "Params.newdocsSearchexclude" "!=" true -}}
  {{- $pages = where $pages "Content" "not in" (slice nil "") -}}

  {{ range $index, $page := $pages }}
  index.add({
    'id': {{ $index }},
    'href': '{{ $page.RelPermalink }}',
    'title': {{ (partial "title" $page) | jsonify }},
    'section': {{ (partial "title" $page.Parent) | jsonify }},
    'content': {{ $page.Plain | jsonify }}
  });
  {{- end -}}
})();
