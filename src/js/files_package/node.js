import _regeneratorRuntime from "babel-runtime/regenerator";

function _asyncToGenerator(fn) { return function () { var gen = fn.apply(this, arguments); return new Promise(function (resolve, reject) { function step(key, arg) { try { var info = gen[key](arg); var value = info.value; } catch (error) { reject(error); return; } if (info.done) { resolve(value); } else { return Promise.resolve(value).then(function (value) { step("next", value); }, function (err) { step("throw", err); }); } } return step("next"); }); }; }

/* eslint-disable import/first */

import React from 'react';
import classNames from "classnames";
import { backend } from "./files";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { FcOpenedFolder, FcFolder } from "react-icons/fc";
import { BsCardImage, BsCameraVideo, BsFileWord, BsFilePdf, BsFileExcel } from "react-icons/bs";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import { AiFillFileUnknown } from "react-icons/ai";

export function Node(_ref) {
  var _this = this;

  var innerRef = _ref.innerRef,
      styles = _ref.styles,
      data = _ref.data,
      handlers = _ref.handlers,
      state = _ref.state,
      tree = _ref.tree;


  function getTypeExt(ext) {
    var img = ["jpeg", "jpg", "png", "gif"];
    var vid = ["mp4", "avi", "MOV", "mpeg"];

    var _iteratorNormalCompletion = true;
    var _didIteratorError = false;
    var _iteratorError = undefined;

    try {
      for (var _iterator = img[Symbol.iterator](), _step; !(_iteratorNormalCompletion = (_step = _iterator.next()).done); _iteratorNormalCompletion = true) {
        var imgExt = _step.value;

        if (imgExt === ext) return "img";
      }
    } catch (err) {
      _didIteratorError = true;
      _iteratorError = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion && _iterator.return) {
          _iterator.return();
        }
      } finally {
        if (_didIteratorError) {
          throw _iteratorError;
        }
      }
    }

    var _iteratorNormalCompletion2 = true;
    var _didIteratorError2 = false;
    var _iteratorError2 = undefined;

    try {
      for (var _iterator2 = vid[Symbol.iterator](), _step2; !(_iteratorNormalCompletion2 = (_step2 = _iterator2.next()).done); _iteratorNormalCompletion2 = true) {
        var vidExt = _step2.value;

        if (vidExt === ext) return "vid";
      }
    } catch (err) {
      _didIteratorError2 = true;
      _iteratorError2 = err;
    } finally {
      try {
        if (!_iteratorNormalCompletion2 && _iterator2.return) {
          _iterator2.return();
        }
      } finally {
        if (_didIteratorError2) {
          throw _iteratorError2;
        }
      }
    }

    return ext;
  }

  function Chevron(_ref2) {
    var iconSize = _ref2.iconSize;

    if (data.global_type === "folder") {
      return React.createElement(
        "i",
        { onClick: handlers.toggle },
        state.isOpen ? React.createElement(HiChevronDown, { size: iconSize }) : React.createElement(HiChevronRight, { size: iconSize })
      );
    } else return React.createElement(
      "i",
      null,
      " \xA0\xA0\xA0\xA0 "
    );
  }

  function TypeIcon(_ref3) {
    var iconSize = _ref3.iconSize;

    if (data.global_type === "folder") {
      return React.createElement(
        "i",
        { onClick: handlers.select },
        state.isOpen ? React.createElement(FcOpenedFolder, { size: iconSize }) : React.createElement(FcFolder, { size: iconSize })
      );
    } else {
      var ext = getTypeExt(data.ext);
      switch (ext) {
        case "img":
          return React.createElement(BsCardImage, { size: iconSize });
        case "vid":
          return React.createElement(BsCameraVideo, { size: iconSize });
        case "docx":
          return React.createElement(BsFileWord, { size: iconSize });
        case "pdf":
          return React.createElement(BsFilePdf, { size: iconSize });
        case "xlsx":
          return React.createElement(BsFileExcel, { size: iconSize });
        case "pptx":
          return React.createElement(SiMicrosoftpowerpoint, { size: iconSize });
        default:
          return React.createElement(AiFillFileUnknown, { size: iconSize });
      }
    }
  }

  return React.createElement(
    "div",
    { className: classNames("arboristRow", state), ref: innerRef, style: styles.row, onClick: function () {
        var _ref4 = _asyncToGenerator( /*#__PURE__*/_regeneratorRuntime.mark(function _callee(e) {
          return _regeneratorRuntime.wrap(function _callee$(_context) {
            while (1) {
              switch (_context.prev = _context.next) {
                case 0:
                  handlers.select(e);
                  setImmediate(function (arg) {
                    var id = tree.getSelectedIds()[0];
                    console.log(id);
                    backend.setCurrentSelectedFolder(id);
                  });

                case 2:
                case "end":
                  return _context.stop();
              }
            }
          }, _callee, _this);
        }));

        return function (_x) {
          return _ref4.apply(this, arguments);
        };
      }() },
    React.createElement(
      "div",
      { className: "row-contents", style: styles.indent },
      React.createElement(
        "a",
        { onDoubleClick: function onDoubleClick(e) {
            handlers.toggle(e);
          } },
        React.createElement(
          "div",
          { className: "row-contents" },
          React.createElement(Chevron, { iconSize: 18 }),
          "\xA0",
          React.createElement(TypeIcon, { iconSize: 28 }),
          "\xA0",
          React.createElement(
            "span",
            null,
            data.name
          )
        )
      )
    )
  );
}