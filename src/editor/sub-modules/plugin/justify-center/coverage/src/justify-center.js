function BranchData() {
    this.position = -1;
    this.nodeLength = -1;
    this.src = null;
    this.evalFalse = 0;
    this.evalTrue = 0;

    this.init = function(position, nodeLength, src) {
        this.position = position;
        this.nodeLength = nodeLength;
        this.src = src;
        return this;
    }

    this.ranCondition = function(result) {
        if (result)
            this.evalTrue++;
        else
            this.evalFalse++;
    };

    this.pathsCovered = function() {
        var paths = 0;
        if (this.evalTrue > 0)
          paths++;
        if (this.evalFalse > 0)
          paths++;
        return paths;
    };

    this.covered = function() {
        return this.evalTrue > 0 && this.evalFalse > 0;
    };

    this.toJSON = function() {
        return '{"position":' + this.position
            + ',"nodeLength":' + this.nodeLength
            + ',"src":' + jscoverage_quote(this.src)
            + ',"evalFalse":' + this.evalFalse
            + ',"evalTrue":' + this.evalTrue + '}';
    };

    this.message = function() {
        if (this.evalTrue === 0 && this.evalFalse === 0)
            return 'Condition never evaluated         :\t' + this.src;
        else if (this.evalTrue === 0)
            return 'Condition never evaluated to true :\t' + this.src;
        else if (this.evalFalse === 0)
            return 'Condition never evaluated to false:\t' + this.src;
        else
            return 'Condition covered';
    };
}

BranchData.fromJson = function(jsonString) {
    var json = eval('(' + jsonString + ')');
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

BranchData.fromJsonObject = function(json) {
    var branchData = new BranchData();
    branchData.init(json.position, json.nodeLength, json.src);
    branchData.evalFalse = json.evalFalse;
    branchData.evalTrue = json.evalTrue;
    return branchData;
};

function buildBranchMessage(conditions) {
    var message = 'The following was not covered:';
    for (var i = 0; i < conditions.length; i++) {
        if (conditions[i] !== undefined && conditions[i] !== null && !conditions[i].covered())
          message += '\n- '+ conditions[i].message();
    }
    return message;
};

function convertBranchDataConditionArrayToJSON(branchDataConditionArray) {
    var array = [];
    var length = branchDataConditionArray.length;
    for (var condition = 0; condition < length; condition++) {
        var branchDataObject = branchDataConditionArray[condition];
        if (branchDataObject === undefined || branchDataObject === null) {
            value = 'null';
        } else {
            value = branchDataObject.toJSON();
        }
        array.push(value);
    }
    return '[' + array.join(',') + ']';
}

function convertBranchDataLinesToJSON(branchData) {
    if (branchData === undefined) {
        return '{}'
    }
    var json = '';
    for (var line in branchData) {
        if (json !== '')
            json += ','
        json += '"' + line + '":' + convertBranchDataConditionArrayToJSON(branchData[line]);
    }
    return '{' + json + '}';
}

function convertBranchDataLinesFromJSON(jsonObject) {
    if (jsonObject === undefined) {
        return {};
    }
    for (var line in jsonObject) {
        var branchDataJSON = jsonObject[line];
        if (branchDataJSON !== null) {
            for (var conditionIndex = 0; conditionIndex < branchDataJSON.length; conditionIndex ++) {
                var condition = branchDataJSON[conditionIndex];
                if (condition !== null) {
                    branchDataJSON[conditionIndex] = BranchData.fromJsonObject(condition);
                }
            }
        }
    }
    return jsonObject;
}
function jscoverage_quote(s) {
    return '"' + s.replace(/[\u0000-\u001f"\\\u007f-\uffff]/g, function (c) {
        switch (c) {
            case '\b':
                return '\\b';
            case '\f':
                return '\\f';
            case '\n':
                return '\\n';
            case '\r':
                return '\\r';
            case '\t':
                return '\\t';
            // IE doesn't support this
            /*
             case '\v':
             return '\\v';
             */
            case '"':
                return '\\"';
            case '\\':
                return '\\\\';
            default:
                return '\\u' + jscoverage_pad(c.charCodeAt(0).toString(16));
        }
    }) + '"';
}

function getArrayJSON(coverage) {
    var array = [];
    if (coverage === undefined)
        return array;

    var length = coverage.length;
    for (var line = 0; line < length; line++) {
        var value = coverage[line];
        if (value === undefined || value === null) {
            value = 'null';
        }
        array.push(value);
    }
    return array;
}

function jscoverage_serializeCoverageToJSON() {
    var json = [];
    for (var file in _$jscoverage) {
        var lineArray = getArrayJSON(_$jscoverage[file].lineData);
        var fnArray = getArrayJSON(_$jscoverage[file].functionData);

        json.push(jscoverage_quote(file) + ':{"lineData":[' + lineArray.join(',') + '],"functionData":[' + fnArray.join(',') + '],"branchData":' + convertBranchDataLinesToJSON(_$jscoverage[file].branchData) + '}');
    }
    return '{' + json.join(',') + '}';
}


function jscoverage_pad(s) {
    return '0000'.substr(s.length) + s;
}

function jscoverage_html_escape(s) {
    return s.replace(/[<>\&\"\']/g, function (c) {
        return '&#' + c.charCodeAt(0) + ';';
    });
}
try {
  if (typeof top === 'object' && top !== null && typeof top.opener === 'object' && top.opener !== null) {
    // this is a browser window that was opened from another window

    if (! top.opener._$jscoverage) {
      top.opener._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null) {
    // this is a browser window

    try {
      if (typeof top.opener === 'object' && top.opener !== null && top.opener._$jscoverage) {
        top._$jscoverage = top.opener._$jscoverage;
      }
    }
    catch (e) {}

    if (! top._$jscoverage) {
      top._$jscoverage = {};
    }
  }
}
catch (e) {}

try {
  if (typeof top === 'object' && top !== null && top._$jscoverage) {
    this._$jscoverage = top._$jscoverage;
  }
}
catch (e) {}
if (! this._$jscoverage) {
  this._$jscoverage = {};
}
if (! _$jscoverage['/justify-center.js']) {
  _$jscoverage['/justify-center.js'] = {};
  _$jscoverage['/justify-center.js'].lineData = [];
  _$jscoverage['/justify-center.js'].lineData[6] = 0;
  _$jscoverage['/justify-center.js'].lineData[7] = 0;
  _$jscoverage['/justify-center.js'].lineData[8] = 0;
  _$jscoverage['/justify-center.js'].lineData[9] = 0;
  _$jscoverage['/justify-center.js'].lineData[10] = 0;
  _$jscoverage['/justify-center.js'].lineData[13] = 0;
  _$jscoverage['/justify-center.js'].lineData[16] = 0;
  _$jscoverage['/justify-center.js'].lineData[18] = 0;
  _$jscoverage['/justify-center.js'].lineData[19] = 0;
  _$jscoverage['/justify-center.js'].lineData[25] = 0;
  _$jscoverage['/justify-center.js'].lineData[26] = 0;
  _$jscoverage['/justify-center.js'].lineData[27] = 0;
  _$jscoverage['/justify-center.js'].lineData[28] = 0;
  _$jscoverage['/justify-center.js'].lineData[30] = 0;
  _$jscoverage['/justify-center.js'].lineData[31] = 0;
  _$jscoverage['/justify-center.js'].lineData[33] = 0;
  _$jscoverage['/justify-center.js'].lineData[42] = 0;
  _$jscoverage['/justify-center.js'].lineData[43] = 0;
  _$jscoverage['/justify-center.js'].lineData[44] = 0;
  _$jscoverage['/justify-center.js'].lineData[45] = 0;
  _$jscoverage['/justify-center.js'].lineData[46] = 0;
  _$jscoverage['/justify-center.js'].lineData[53] = 0;
}
if (! _$jscoverage['/justify-center.js'].functionData) {
  _$jscoverage['/justify-center.js'].functionData = [];
  _$jscoverage['/justify-center.js'].functionData[0] = 0;
  _$jscoverage['/justify-center.js'].functionData[1] = 0;
  _$jscoverage['/justify-center.js'].functionData[2] = 0;
  _$jscoverage['/justify-center.js'].functionData[3] = 0;
  _$jscoverage['/justify-center.js'].functionData[4] = 0;
  _$jscoverage['/justify-center.js'].functionData[5] = 0;
  _$jscoverage['/justify-center.js'].functionData[6] = 0;
  _$jscoverage['/justify-center.js'].functionData[7] = 0;
}
if (! _$jscoverage['/justify-center.js'].branchData) {
  _$jscoverage['/justify-center.js'].branchData = {};
  _$jscoverage['/justify-center.js'].branchData['27'] = [];
  _$jscoverage['/justify-center.js'].branchData['27'][1] = new BranchData();
  _$jscoverage['/justify-center.js'].branchData['30'] = [];
  _$jscoverage['/justify-center.js'].branchData['30'][1] = new BranchData();
  _$jscoverage['/justify-center.js'].branchData['44'] = [];
  _$jscoverage['/justify-center.js'].branchData['44'][1] = new BranchData();
  _$jscoverage['/justify-center.js'].branchData['44'][2] = new BranchData();
}
_$jscoverage['/justify-center.js'].branchData['44'][2].init(39, 29, 'e.keyCode == S.Node.KeyCode.E');
function visit4_44_2(result) {
  _$jscoverage['/justify-center.js'].branchData['44'][2].ranCondition(result);
  return result;
}_$jscoverage['/justify-center.js'].branchData['44'][1].init(26, 42, 'e.ctrlKey && e.keyCode == S.Node.KeyCode.E');
function visit3_44_1(result) {
  _$jscoverage['/justify-center.js'].branchData['44'][1].ranCondition(result);
  return result;
}_$jscoverage['/justify-center.js'].branchData['30'][1].init(188, 41, 'editor.queryCommandValue("justifyCenter")');
function visit2_30_1(result) {
  _$jscoverage['/justify-center.js'].branchData['30'][1].ranCondition(result);
  return result;
}_$jscoverage['/justify-center.js'].branchData['27'][1].init(34, 45, 'editor.get("mode") == Editor.Mode.SOURCE_MODE');
function visit1_27_1(result) {
  _$jscoverage['/justify-center.js'].branchData['27'][1].ranCondition(result);
  return result;
}_$jscoverage['/justify-center.js'].lineData[6]++;
KISSY.add("editor/plugin/justify-center", function(S, Editor, justifyCenterCmd) {
  _$jscoverage['/justify-center.js'].functionData[0]++;
  _$jscoverage['/justify-center.js'].lineData[7]++;
  function exec() {
    _$jscoverage['/justify-center.js'].functionData[1]++;
    _$jscoverage['/justify-center.js'].lineData[8]++;
    var editor = this.get("editor");
    _$jscoverage['/justify-center.js'].lineData[9]++;
    editor.execCommand("justifyCenter");
    _$jscoverage['/justify-center.js'].lineData[10]++;
    editor.focus();
  }
  _$jscoverage['/justify-center.js'].lineData[13]++;
  function justifyCenter() {
    _$jscoverage['/justify-center.js'].functionData[2]++;
  }
  _$jscoverage['/justify-center.js'].lineData[16]++;
  S.augment(justifyCenter, {
  pluginRenderUI: function(editor) {
  _$jscoverage['/justify-center.js'].functionData[3]++;
  _$jscoverage['/justify-center.js'].lineData[18]++;
  justifyCenterCmd.init(editor);
  _$jscoverage['/justify-center.js'].lineData[19]++;
  editor.addButton("justifyCenter", {
  tooltip: "\u5c45\u4e2d\u5bf9\u9f50", 
  checkable: true, 
  listeners: {
  click: exec, 
  afterSyncUI: function() {
  _$jscoverage['/justify-center.js'].functionData[4]++;
  _$jscoverage['/justify-center.js'].lineData[25]++;
  var self = this;
  _$jscoverage['/justify-center.js'].lineData[26]++;
  editor.on("selectionChange", function() {
  _$jscoverage['/justify-center.js'].functionData[5]++;
  _$jscoverage['/justify-center.js'].lineData[27]++;
  if (visit1_27_1(editor.get("mode") == Editor.Mode.SOURCE_MODE)) {
    _$jscoverage['/justify-center.js'].lineData[28]++;
    return;
  }
  _$jscoverage['/justify-center.js'].lineData[30]++;
  if (visit2_30_1(editor.queryCommandValue("justifyCenter"))) {
    _$jscoverage['/justify-center.js'].lineData[31]++;
    self.set("checked", true);
  } else {
    _$jscoverage['/justify-center.js'].lineData[33]++;
    self.set("checked", false);
  }
});
}}, 
  mode: Editor.Mode.WYSIWYG_MODE});
  _$jscoverage['/justify-center.js'].lineData[42]++;
  editor.docReady(function() {
  _$jscoverage['/justify-center.js'].functionData[6]++;
  _$jscoverage['/justify-center.js'].lineData[43]++;
  editor.get("document").on("keydown", function(e) {
  _$jscoverage['/justify-center.js'].functionData[7]++;
  _$jscoverage['/justify-center.js'].lineData[44]++;
  if (visit3_44_1(e.ctrlKey && visit4_44_2(e.keyCode == S.Node.KeyCode.E))) {
    _$jscoverage['/justify-center.js'].lineData[45]++;
    editor.execCommand("justifyCenter");
    _$jscoverage['/justify-center.js'].lineData[46]++;
    e.preventDefault();
  }
});
});
}});
  _$jscoverage['/justify-center.js'].lineData[53]++;
  return justifyCenter;
}, {
  requires: ['editor', './justify-center/cmd']});
