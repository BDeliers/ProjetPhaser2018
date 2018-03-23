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
    
    var image = phaser.sprite = phaser.add.sprite(380, 200, background_name).setInteractive();
    image.setScale(0.5);

    image.on("pointerdown", (pointer)=>{

        json.path.push([pointer.x, pointer.y]);
        DrawLine(phaser, {color: "0x333300", width: 4, rounded_angles: true}, json.path);
        console.log("push : ", pointer.x, " ", pointer.y);

    });

    phaser.input.keyboard.on('keydown', function(event){
        console.log(json.path);

        $.ajax({
            url: 'http://localhost:8080',
            type: 'POST',
            data: JSON.stringify(json),
            dataType: 'json', 
            success: function(){
                console.log("message envoyé au serveur");
            }, 

            error: function(){
                console.log("Erreur requete Ajax");
            }
        })
    });
} 