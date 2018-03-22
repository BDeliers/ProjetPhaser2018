/**
 * Tool in order to create Json paths file
 * ERROR : la fonction DrawLine ne se lance pas (ne se charge pas ?)
 * TODO : Utilitaire Node pour générer les fichiers Json
 */

 console.log("load pathsGenerator");
 
function pathsGenerator(phaser, background_name, json_file_name){
    var json = {
        "name": json_file_name,
        "path": []
    }
    var image = new Button(phaser, background_name, 760, 400); 
    image.on("click_on", function(pointer){
        json.path.push(new Array([pointer.x, pointer.y]));
        DrawLine(phaser, {color:"0xFFFF00", width: 4, rounded_angles: true}, json.path);
        console.log("push : ", pointer.x, " ", pointer.y);
    });

    phaser.input.keyboard.on('keydown', function(event){
        console.log(json);
    });
} 