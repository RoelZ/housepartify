$(function(){
            
    var aPrefix = Array;
    var aSuffix = Array;
    aPrefix = { neutral: ["DJ", "Grandmaster", "DeeJay", "Party Animal", "MC", 'Boss', 'Red Hot', 'Jr.'], 
                male: ["Beatboy", "Master", "Mister", "Mr.", "B-Boy", "Mista", 'King', 'Lord', 'Main-Man'], 
                female: ["Lady", "Partygirl", "Miss", "Flygirl", "Sister", 'Queen', 'Duchess', 'Main-Girl', 'Princess'] };
    // vowel = klinker (aeyuio)
    // consonant = medeklinker
    aSuffix = { vowel: ["izzle", "axx", "ixx", "izzy", 'assi', 'etta', 'illex', 'ablo', 'arris', 'eezy', 'ezzle', 'ibble'], 
                consonant: [ "rexx", "flexx", "max", "ross", "riffle", "jay", "jazz", "bass", "BoomBoom", "jaxx", "boogie", 
                "funky", "bounce", 'ckie', 'punk', 'cotto', 'jam', 'stylez', 'juggle', 'noize', 'beats', 'riffs', 'scribbly' ] };

    // DJ R. Heesterbeekizzle
    // DJ La Heesterbeek
    // DJ R. Izzle
    // DJ RR. Izzle
    // van der tocht = vandertox
    // een lettergreep

    String.prototype.capitalizeFirst = function(){
        return this.charAt(0).toUpperCase() + this.slice(1);
    }

    function getRandom(array){
        return Math.floor(Math.random() * array.length);
    }
    function searchVowels(sName,position){                
        sName = sName.toLowerCase();
        aSibblings = sName.match(/[aeiouy]{1,2}/g);

        // if name has more then one vowel we strip it from their last
        if(aSibblings.length > 1){
            if(position == 'start'){

                // one or two sublings
                if(aSibblings.length < 3)
                {
                    // first letter not a vowel
                    if(sName.charAt(0).match(/[aeiouy]{1,2}/g) == null)
                    {
                        // if first vowel holds only one letter
                        if(aSibblings[0].length == 1 && aSibblings[0].match(/[aeou]{1,2}/g)){
                            //iLength = aSibblings[0].length;
                            iStart = sName.indexOf(aSibblings[0])+1;
                            iEnd = sName.length;
                            //console.log(sName.charAt(iStart));
                            
                            sLast = aSibblings[0]+sName.charAt(iStart);
                            //console.log(sName);
                            sName = sName.slice(0,(iStart-iEnd));
                            return sName+sLast;
                        }
                        else {
                            // van twee lettergrepen de eerste volledig tonen
                            iStart = sName.lastIndexOf(aSibblings[1]);
                            iEnd = sName.length;
                            return sName.slice(0,(iStart-iEnd));
                        }
                    }                    
                    //console.log(aSibblings[0].length+', '+iStart+', '+iEnd);
                    return sName;
                }
                else if(aSibblings.length > 2){
                    
                    sLastVowelChar = sName.charAt(sName.indexOf(aSibblings[1])+1);
                    console.log((sName.indexOf(aSibblings[1])+1)+"= "+sLastVowelChar)
                    if(sLastVowelChar.match(/[l]{1,2}/g)){
                        iStart = sName.indexOf(aSibblings[1])+1;                        
                    } else {
                        iStart = sName.indexOf(aSibblings[1])+2;
                    }

                    iEnd = sName.length;
                    sName = sName.slice(0,(iStart-iEnd));
                    return sName;
                }
                else {
                    return sName;
                }
            }
            else {
                iStart = sName.lastIndexOf(aSibblings[aSibblings.length-1]);
                iEnd = sName.length;
                return sName.slice(0,((iStart-iEnd)-1));
            }                       
        }
        else {
            return sName;
        } 
    }
    // Create Prefix
    function getPrefix(){
        if($('#genderMan').is(':checked')){                    
            sPrefix = aPrefix.male[getRandom(aPrefix.male)];                    
        }
        else if($('#genderVrouw').is(':checked')){
            sPrefix = aPrefix.female[getRandom(aPrefix.female)];
        }
        return Math.random() < 0.5 ? sPrefix : aPrefix.neutral[getRandom(aPrefix.neutral)];    
    }
    // Create Firstname
    function getFirstName(){
        if($("#firstname").val().length){    

            iRandom = Math.floor(Math.random() * 4);
            var sName = $("#firstname").val();
            //sName = sName.charAt(0).toUpperCase();
            
            // 1e letters van de naam (tot er een klinker komt)  - achternaam met suffix
            if(iRandom == 0){
                return searchVowels(sName,"start").capitalizeFirst();
            }
            // voornaam vervangen door La 
            else if(iRandom == 1){
                return "La";
            }
            // 1e letter voornaam
            else if(iRandom == 2){
                return sName = sName.substr(0,1).capitalizeFirst() + ".";
            }
            // 1e letter voornaam x 2
            else if(iRandom == 3){
                return sName.substr(0,1).toUpperCase() + "." + sName.substr(0,1).toUpperCase() + ".";
            } 
        } 
        else 
        {
            return "Essent";
        }
    }
    // Create Surname
    function getSurName(){
        if($("#surname").val().length){
            sName = $("#surname").val().replace(/\s/g, '');
            sStrippedSurname = searchVowels(sName);

            // we get the last character so we can place the right suffix
            sLastChar = sStrippedSurname.substr(sStrippedSurname.length-1);

            if(sLastChar.match(/[aeiouy]/g))
                sSuffix = aSuffix.consonant[getRandom(aSuffix.consonant)];
            else
                sSuffix = aSuffix.vowel[getRandom(aSuffix.vowel)];
            
            //console.log(sName.match(/[aeiouy]{1,2}/g));
            //lastIndex = sName.lastIndexOf(sName.match(/[aeiouy]{1,2}/g).length);
            //console.log(sStrippedSurname);
            return sStrippedSurname.capitalizeFirst()+sSuffix;
        }
    }
    function getName(){
        var sPrefix = getPrefix();
        var sFirstName = getFirstName();
        var sSurName = getSurName();       
        return sPrefix+' '+sFirstName+' '+sSurName;
    }
        
    
    // Trigger generator
    $('button[type="submit"]').click( function(){
        $('.generatedName').removeClass('hidden');
        $('.generatedName h2').text(getName()).addClass('rotateIn');
    });
    
    //aSuffix = new Array();
    //aSuffix.push("");
    //console.log(aPrefix);
});