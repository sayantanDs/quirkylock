import React, { useState, useRef, useEffect } from 'react';
import Image from 'next/image';
import Rule from "../Rule";
import "./RuleSlidingPuzzle.css";

import {getRandomWord, getPuzzle} from "./utils";



export default class RuleSlidingPuzzle extends Rule{
    constructor(){
        super("Your password must contain the following word.");
        this.word = getRandomWord();
        console.log("Puzzle word:", this.word);
        this.children = <SlidingPuzzle word={this.word}/>;
    }

    check(txt){
        let r = new RegExp(`(${this.word})`, "i");
        return r.test(txt); 
    }
}


function SlidingPuzzle({word}){
    const canvasRef = useRef(null);
    const smallCanvasRef = useRef(null);
    const cropedImages = useRef([]);

    const [puzzleGrid, setPuzzleGrid] = useState(null);


    const BLANK_CELL_NUM = 8;

    function createWordImage(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');

        ctx.fillStyle = "#fff";
        ctx.fillRect(0, 0, canvas.width, canvas.height);

        ctx.font = "bold 200px sans-serif";
        ctx.fillStyle = "#4e4e4e";
        ctx.fillText(word.toUpperCase(), 5, canvas.height-20, canvas.width-10);
    }

    function getCroppedImages(){
        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d', {willReadFrequently: true});
        const smallCanvas = smallCanvasRef.current;
        const ctx_small = smallCanvas.getContext('2d', {willReadFrequently: true});

        let cropped_imgs = Array(9).fill(null);

        for(let i=0;i<cropped_imgs.length;i++){
            let x = i%3 * 60;
            let y = Math.floor(i/3) * 60;
            let imgData = ctx.getImageData(x, y, 60, 60);
            ctx_small.putImageData(imgData, 0, 0);
            
            let data = smallCanvas.toDataURL();
            cropped_imgs[i] = data;
        }

        return cropped_imgs;       
    }   
    

    useEffect(()=>{

        createWordImage();
        cropedImages.current = getCroppedImages();

        let puzzle = getPuzzle();
        setPuzzleGrid(puzzle);

    }, []);


    function onClick(i, j){

        // console.log("onclick", i, j);

        let puzzleGridCopy = puzzleGrid.map((item) => item.slice());

        let neighbour_indices = [[i-1, j], [i, j+1], [i+1, j], [i, j-1]];
        let update_made = false;

        for(let k=0;k<neighbour_indices.length;k++){
            let p = neighbour_indices[k][0];
            let q = neighbour_indices[k][1];

            if(p>=0 && p <=2 && q>=0 && q <=2 && puzzleGridCopy[p][q]===BLANK_CELL_NUM){

                puzzleGridCopy[p][q] = puzzleGridCopy[i][j];
                puzzleGridCopy[i][j] = BLANK_CELL_NUM;
                update_made = true;
                break;
            }
        }
        if(update_made){
            setPuzzleGrid(puzzleGridCopy);
        }
    }

    return (
        <div className='sliding_puzzle'>
            <canvas key={'c1'}
                ref={canvasRef}
                width="180" 
                height="180"
                hidden={true}
            />
            <canvas key={'c2'}
                ref={smallCanvasRef}
                width="60" 
                height="60"
                hidden={true}
            />
            
            {                
                puzzleGrid?.map((row, i) => {
                    return row.map((piece, j) => {
                        if(piece===BLANK_CELL_NUM){
                            return (
                                <div className='puzzle_piece_wrapper' key={`${i},${j}`}>
                                    {/* <span className='puzzle_piece_num'>{piece+1}</span> */}
                                    <div 
                                        style={{width: 60, height: 60}}
                                        className='puzzle_piece'
                                    />
                                </div> 
                            )
                        }
                        else{
                            return (
                                <div className='puzzle_piece_wrapper' key={`${i},${j}`}>
                                    <span className='puzzle_piece_num'>{piece+1}</span>
                                    <img                                         
                                        className='puzzle_piece'                                        
                                        src={cropedImages.current[piece]} 
                                        width={60} 
                                        height={60} 
                                        alt={`${piece}`}
                                        onClick={() => onClick(i, j)}
                                    />
                                </div>                         
                            )
                        }
                    })
                })
                
            }
        </div>
    );
}

export {SlidingPuzzle, getRandomWord, getPuzzle}



/*


ctx.beginPath();
ctx.strokeStyle = "red";
ctx.moveTo(60, 0);ctx.lineTo(60, 180);ctx.stroke();
ctx.moveTo(120, 0);ctx.lineTo(120, 180);ctx.stroke();
ctx.moveTo(0, 60);ctx.lineTo(180, 60);ctx.stroke();
ctx.moveTo(0, 120);ctx.lineTo(180, 120);ctx.stroke();

-----------


function somethin(){
        createWord();

        const canvas = canvasRef.current;
        const ctx = canvas.getContext('2d');
        const ctxArr = new Array(9).fill(0).map((v, i) => canvasGridRef.current[i].getContext('2d'));

        let imgData = new Array(9);
        imgData[0] = ctx.getImageData(0, 0, 60, 60);
        imgData[1] = ctx.getImageData(60, 0, 60, 60);
        imgData[2] = ctx.getImageData(120, 0, 60, 60);
        imgData[3] = ctx.getImageData(0, 60, 60, 60);
        imgData[4] = ctx.getImageData(60, 60, 60, 60);
        imgData[5] = ctx.getImageData(120, 60, 60, 60);
        imgData[6] = ctx.getImageData(0, 120, 60, 60);
        imgData[7] = ctx.getImageData(60, 120, 60, 60);
        imgData[8] = ctx.getImageData(120, 120, 60, 60);

        imgData.sort(()=>Math.random()-0.5);

        for(let i=0;i<9;i++){
            ctxArr[i].putImageData(imgData[i], 0, 0);
        }
    }



*/