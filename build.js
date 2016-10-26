#!/usr/bin/env node
/*
Metalsmith build file.
*/

require('./node_modules/harmonize')();
var Metalsmith = require('metalsmith'),
    layouts    = require('metalsmith-layouts'),
    collections = require('metalsmith-collections'),
    permalinks = require('metalsmith-permalinks'),
    rootPath = require('metalsmith-rootpath'),
    markdown = require('metalsmith-markdown-remarkable'),
    watch = require('metalsmith-watch'),
    ignore = require('metalsmith-ignore');
    date = require('metalsmith-build-date');

  Metalsmith(__dirname)
      .source('./source')
      .destination('./docs')
      .clean(false)                  // do not clean destination
      .use(
        watch({
          paths: {
            "${source}/*": true,
          },
          livereload: true,
        }))
        .use(collections({
            chapters: {
                pattern: '.source/*.md'
            }
            }))
       .use(date())                   // directory before new build
       .use(markdown('full', {
         html: true,
         breaks: true,
         typographer: true,
         quotes: '“”‘’',
       }))
       .use(layouts({
        engine: 'handlebars',
        partials: './assets/partials',
        directory: './assets/layouts'
      }))
      .build(function(err) {
        if (err) throw err;
      });
