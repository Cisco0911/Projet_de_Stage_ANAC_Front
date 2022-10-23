/* eslint-disable import/first */

import React from 'react';
import classNames from "classnames";
import {backend} from "./files";
import { HiChevronDown, HiChevronRight } from "react-icons/hi";
import { FcOpenedFolder, FcFolder } from "react-icons/fc";
import { BsCardImage, BsCameraVideo, BsFileWord, BsFilePdf, BsFileExcel } from "react-icons/bs";
import { SiMicrosoftpowerpoint } from "react-icons/si";
import { AiFillFileUnknown } from "react-icons/ai";

export function Node({ innerRef, styles, data, handlers, state, tree}) {

  function getTypeExt(ext) {
    const img = ["jpeg", "jpg", "png", "gif"]
    const vid = ["mp4", "avi", "MOV", "mpeg"]

    for(let imgExt of img)
    {
      if(imgExt === ext) return "img";
    }
    for(let vidExt of vid)
    {
      if(vidExt === ext) return "vid";
    }
    return ext
  }
 
  function Chevron({iconSize}) {
   if (data.global_type === "folder") {
    return (
      <i onClick={handlers.toggle}>
             {
               state.isOpen ?
               <HiChevronDown size={iconSize} />:<HiChevronRight size={iconSize} />
             }
       </i>
       )
   }
   else return <i> &nbsp;&nbsp;&nbsp;&nbsp; </i>;
  }

  function TypeIcon({iconSize}) {
    if (data.global_type === "folder") {
     return (
       <i onClick={handlers.select}>
              {
                state.isOpen ?
                <FcOpenedFolder size={iconSize} />:<FcFolder size={iconSize} />
              }
        </i>
        )
    }
    else 
    {
      let ext = getTypeExt(data.ext)
      switch(ext) {
        case "img":
          return <BsCardImage size={iconSize} />
        case "vid":
          return <BsCameraVideo size={iconSize} />
        case "docx":
          return <BsFileWord size={iconSize} />
        case "pdf":
          return <BsFilePdf size={iconSize} />
        case "xlsx":
          return <BsFileExcel size={iconSize} />
        case "pptx":
          return <SiMicrosoftpowerpoint size={iconSize} />
        default:
          return <AiFillFileUnknown size={iconSize} />
      }
    }
   }

  return (
    <div className={classNames("arboristRow", state)} ref={innerRef} style={styles.row} onClick={async (e)=>{
      handlers.select(e);
      setImmediate(
        arg => 
        {
          const id = tree.getSelectedIds()[0]
          console.log(id)
          backend.setCurrentSelectedFolder(id)
        }
      )
      }}>
      <div className="row-contents" style={styles.indent}  >
      <a onDoubleClick={(e) => { 
        handlers.toggle(e)
        }}>
        <div className='row-contents'>
          <Chevron iconSize = {18}/>
          &nbsp;
          <TypeIcon iconSize = {28}/>
          &nbsp;
          <span>{data.name}</span>
        </div>
      </a>
      </div>
    </div>
  );
  }