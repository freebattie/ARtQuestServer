# Code standard

All code, code names and comments are to be written in English

### camelCase
- variables
- functions
> var backedPotato
> 
> static backedPotato = async (string) {...} 

### PascalCase
- Classes / Components
- Filenames.js
> export default class BackedPotato {...}
> 
> BackedPotato.js

### snake_case
- folders
> ../artquest_server/backed_potato

### CAPCASE
- const VARIABLES
> const BACKEDPOTATO

### smallcase
- json variables
- database colon name
- database table name
> { "backedpotato": "true" }
> 
> SELECT backedpotato FROM artquest


### How to comment code:
Description of file:

    /** #======================================================#
     *  #    Program or program file : name.file or description
     *  #    Description: What program does
     *  #    Author: Author name
     *  #    Date: current date
     *  #    Version 1.0
     *  #======================================================#
     * */

Description of methode/functions:

    /**
     * @description description     
     * @param       datatype - description
     * @return      datatype - description
     * */