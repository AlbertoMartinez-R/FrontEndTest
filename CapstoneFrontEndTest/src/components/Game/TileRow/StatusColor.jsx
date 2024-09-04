import React from "react";

export default function getStatusColor(status){
    switch(status){
        case 'correct':
            return 'green';
        case 'partial':
            return 'yellow'
        case 'incorrect':
            return 'grey'
        default:
            return 'transparent'
    }

}
/*1. Right now every tile on the entire board turns green when you enter the correct answer.
2. entering a wrong answer gives an error.
 */