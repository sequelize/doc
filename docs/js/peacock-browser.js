/*
 * Copyright 2012 Thorsten Lorenz. 
 * All rights reserved.
 * 
 * Permission is hereby granted, free of charge, to any person
 * obtaining a copy of this software and associated documentation
 * files (the "Software"), to deal in the Software without
 * restriction, including without limitation the rights to use,
 * copy, modify, merge, publish, distribute, sublicense, and/or sell
 * copies of the Software, and to permit persons to whom the
 * Software is furnished to do so, subject to the following
 * conditions:
 * 
 * The above copyright notice and this permission notice shall be
 * included in all copies or substantial portions of the Software.
 * 
 * THE SOFTWARE IS PROVIDED "AS IS", WITHOUT WARRANTY OF ANY KIND,
 * EXPRESS OR IMPLIED, INCLUDING BUT NOT LIMITED TO THE WARRANTIES
 * OF MERCHANTABILITY, FITNESS FOR A PARTICULAR PURPOSE AND
 * NONINFRINGEMENT. IN NO EVENT SHALL THE AUTHORS OR COPYRIGHT
 * HOLDERS BE LIABLE FOR ANY CLAIM, DAMAGES OR OTHER LIABILITY,
 * WHETHER IN AN ACTION OF CONTRACT, TORT OR OTHERWISE, ARISING
 * FROM, OUT OF OR IN CONNECTION WITH THE SOFTWARE OR THE USE OR
 * OTHER DEALINGS IN THE SOFTWARE.
 * 
 */


;(function () {
  function bootstrap (redeyed, exports) {
    'use strict';

      //@ sourceMappingURL=spans.js.map
  var classes = {
        String                   :  's'
      , Number                   :  'f'
  
      , Keyword                  :  'k'
      , 'Keyword.Constant'       :  'kc'
      , 'Keyword.Declaration'    :  'kd'
      , 'Keyword.Namespace'      :  'kn'
      , 'Keyword.Pseudo'         :  'kp'
      , 'Keyword.Reserved'       :  'kr'
      , 'Keyword.Type'           :  'kt'
  
      , Name                     :  'n'
      , 'Name.Attribute'         :  'na'
      , 'Name.Builtin'           :  'nb'
      , 'Name.Builtin.Pseudo'    :  'bp'
      , 'Name.Class'             :  'nc'
      , 'Name.Constant'          :  'no'
      , 'Name.Decorator'         :  'nd'
      , 'Name.Entity'            :  'ni'
      , 'Name.Exception'         :  'ne'
      , 'Name.Function'          :  'nf'
      , 'Name.Property'          :  'py'
      , 'Name.Label'             :  'nl'
      , 'Name.Namespace'         :  'nn'
      , 'Name.Other'             :  'nx'
      , 'Name.Tag'               :  'nt'
      , 'Name.Variable'          :  'nv'
      , 'Name.Variable.Class'    :  'vc'
      , 'Name.Variable.Global'   :  'vg'
      , 'Name.Variable.Instance' :  'vi'
  
  
      , Literal                  :  'l'
      , 'Literal.Date'           :  'ld'
  
      , Operator                 :  'o'
      , Punctuation              :  'p'
  
      , Comment                  :  'c'
      , 'Comment.Multiline'      :  'cm'
      , 'Comment.Preproc'        :  'cp'
      , 'Comment.Single'         :  'c1'
      , 'Comment.Special'        :  'cs'
  
      , Generic                  :  'g'
      , 'Generic.Deleted'        :  'gd'
      , 'Generic.Emph'           :  'ge'
      , 'Generic.Error'          :  'gr'
      , 'Generic.Heading'        :  'gh'
      , 'Generic.Inserted'       :  'gi'
      , 'Generic.Output'         :  'go'
      , 'Generic.Prompt'         :  'gp'
      , 'Generic.Strong'         :  'gs'
      , 'Generic.Subheading'     :  'gu'
      , 'Generic.Traceback'      :  'gt'
      }
    , spans = {};
    
  function escapeHtml (s) {
    return s.replace(/&/g, "&amp;").replace(/</g, "&lt;").replace(/>/g, "&gt;"); 
  }
  
  function wrap (clazz) {
    return function escapeAndWrap (s) {
      return [ 
          '<span class="'
        , clazz 
        , '">' 
        , escapeHtml(s) 
        , '</span>'
        ].join('');
    };
  }
  
  Object.keys(classes)
    .forEach(function (k) {
      spans[k] = wrap(classes[k]);
    });
  
  
    
      //@ sourceMappingURL=themes/default.js.map
  
  var defaultTheme = {
  
      'Boolean': {
        'true'   :  undefined
      , 'false'  :  undefined
      , _default :  spans['Keyword.Constant']
      }
  
    , 'Identifier': {
        'Date': spans['Literal.Date']
      , 'Error': spans['Generic.Error']
      , _default: spans.Name.Other
      }
  
    , 'Null': {
        _default :  spans['Keyword.Constant']
      }
  
    , 'Numeric': {
        _default: spans.Number
      }
  
    , 'String': {
        _default: spans.String
      }
  
    , 'Keyword': {
        'break'       :  undefined
  
      , 'case'        :  undefined
      , 'catch'       :  undefined
      , 'continue'    :  undefined
  
      , 'debugger'    :  undefined
      , 'default'     :  undefined
      , 'delete'      :  undefined
      , 'do'          :  undefined
  
      , 'else'        :  undefined
  
      , 'finally'     :  undefined
      , 'for'         :  undefined
      , 'function'    :  undefined
  
      , 'if'          :  undefined
      , 'in'          :  undefined
      , 'instanceof'  :  undefined
  
      , 'new'         :  undefined
      , 'return'      :  undefined
      , 'switch'      :  undefined
  
      , 'this'        :  undefined
      , 'throw'       :  undefined
      , 'try'         :  undefined
      , 'typeof'      :  undefined
  
      , 'var'         :  undefined
      , 'void'        :  undefined
  
      , 'while'       :  undefined
      , 'with'        :  undefined
      , _default      :  spans.Keyword
    }
    , 'Punctuator': {
        ';': spans.Punctuation  
      , '.': spans.Punctuation  
      , ',': spans.Punctuation  
  
      , '{': spans.Punctuation  
      , '}': spans.Punctuation  
      , '(': spans.Punctuation  
      , ')': spans.Punctuation  
      , '[': spans.Punctuation
      , ']': spans.Punctuation
  
      , '<': undefined
      , '>': undefined
      , '+': undefined
      , '-': undefined
      , '*': undefined
      , '%': undefined
      , '&': undefined
      , '|': undefined
      , '^': undefined
      , '!': undefined
      , '~': undefined
      , '?': undefined
      , ':': undefined
      , '=': undefined
  
      , '<=': undefined
      , '>=': undefined
      , '==': undefined
      , '!=': undefined
      , '++': undefined
      , '--': undefined
      , '<<': undefined
      , '>>': undefined
      , '&&': undefined
      , '||': undefined
      , '+=': undefined
      , '-=': undefined
      , '*=': undefined
      , '%=': undefined
      , '&=': undefined
      , '|=': undefined
      , '^=': undefined
      , '/=': undefined
  
      , '===': undefined
      , '!==': undefined
      , '>>>': undefined
      , '<<=': undefined
      , '>>=': undefined
      
      , '>>>=': undefined
  
      , _default: spans.Operator  
    }
    , Line: {
       _default: spans['Comment.Single']
      }
  
    , Block: {
       _default: spans.Comment
      }
  
    , _default: undefined
  };
  
    
    function resolveTheme() { 
      throw new Error('Resolving a theme by filename only works server side. \n' + 
                      'Manually resolve or create a theme {Object} and pass that to "highlight" instead.');
    }

      //@ sourceMappingURL=peacock.js.map
  function highlight(code, opts) {
    var toString = Object.prototype.toString
      , splits
      , theme
      , highlightedCode;
  
    function createLinenos (highlightedCode) {
      var linesLen = highlightedCode.split('\n').length
        , lines = []
        , totalDigits
        ;
  
      function getDigits (n) {
        if (n < 10) return 1;
        if (n < 100) return 2;
        if (n < 1000) return 3;
        if (n < 10000) return 4;
        // this works for up to 99,999 lines - any questions?
        return 5;
      }
  
      function pad (n, totalDigits) {
        // not pretty, but simple and should perform quite well
        var padDigits= totalDigits - getDigits(n);
        switch(padDigits) {
          case 0: return '' + n;
          case 1: return ' ' + n;
          case 2: return '  ' + n;
          case 3: return '   ' + n;
          case 4: return '    ' + n;
          case 5: return '     ' + n;
        }
      }
  
      function linenoHtml (lineno, totalDigits) {
        return  [ '<span class="lineno">'
                , pad(lineno, totalDigits)
                , '</span>'
                ].join('');
      }
  
      totalDigits = getDigits(linesLen);
  
      for (var i = 1; i <= linesLen; i++) {
        lines.push(linenoHtml(i, totalDigits));
      }
  
      return lines.join('\n');
    }
  
    opts = opts || { };
  
    function isObject (obj) {
      return toString.call(obj) === '[object Object]';
    }
  
    if(opts.theme) 
      theme = isObject(opts.theme) ? opts.theme : resolveTheme(opts.theme);
    else
      theme = defaultTheme;
  
    highlightedCode = redeyed(code, theme).code;
  
    // Wrap highlighted code inside two column table with lineno column
    if (opts.linenos) highlightedCode = [
        '<table>'
      ,   '<td>'
      ,     createLinenos(highlightedCode)
      ,   '</td>'
      ,   '<td>'
      ,      highlightedCode
      ,   '</td>'
      , '</table>'
      ].join('\n');
    
  
    return [
        '<div class="highlight"><pre>'
      , highlightedCode
      , '</pre></div>'
    ].join('\n');
  }

    return { highlight: highlight };
  }

  if (typeof define === 'function' && define.amd) {
    // amd
    define(['redeyed'], function (redeyed) {
      return bootstrap(redeyed);
    });

  } else if (typeof window === 'object') {
    // no amd -> attach to window if it exists
    // Note that this requires 'redeyed' to be defined on the window which in turn requires 'esprima'
    // Therefore those scripts have to be loaded first
    window.peacock = bootstrap(window.redeyed);
  } 
})();