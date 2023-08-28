'use client'

import React, { useState } from 'react';

import {SlidingPuzzle} from "../../rules/RuleSlidingPuzzle/RuleSlidingPuzzle";
import {getRandomWord} from "../../rules/RuleSlidingPuzzle/utils";

function PuzzlePage() {
    const [word, setWord] = useState(getRandomWord());

    return ( <SlidingPuzzle word={word}/> );
}

export default PuzzlePage;