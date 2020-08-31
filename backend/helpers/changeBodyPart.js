function changeBodyPart(bodyPart){
    /** 
     * 
     * checks if has folder body / arm-left / arm-right
     * 
     * then puts it into a data form to be updated to database
     * 
     */
    if(bodyPart.includes('/torso/')){
        return {'torso': bodyPart}
    }
    if(bodyPart.includes('/left_arm/')){
        return {'left_arm': bodyPart}
      }
      if(bodyPart.includes('/right_arm/')){
        return {'right_arm': bodyPart}  
      }
      if(bodyPart.includes('/head/')){
        return {'head': bodyPart}
      }
      if(bodyPart.includes('/legs/')){
        return {'legs': bodyPart}
    } 
} 
module.exports = changeBodyPart;