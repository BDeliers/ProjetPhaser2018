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
    var isActive = false;
    
    var line = new Line(phaser, {color: "0x333300", width: 4, rounded_angles: true});
    console.log(" -- Pour utiliser le path generator -- ");
    console.log(" a) activer/desactiver le clic");
    console.log(" q) Générer le JSON");
    console.log(" z) annuler le clic précédent");
    
    phaser.input.keyboard.on("keydown", (event) =>{
        switch(event.key){
            case 'a':
                if(isActive){
                    isActive = false;
                    console.log("clic désactivé");
                }else{
                    isActive = true;
                    console.log("clic activé");
                }
                break;
            case 'q':
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
                });
                break;
            case 'z':
                if(json.path.length > 0){
                    console.log("suppression du point : ", json.path.pop());
                    line.clean();
                    line.draw(json.path);
                }
                break;
            default:
                console.log("touche non assigné");
        }
    });

    var image = phaser.sprite = phaser.add.sprite(380, 200, background_name).setInteractive();
    image.setScale(0.5);

    
    image.on("pointerdown", (pointer)=>{
        if(isActive){
            json.path.push([pointer.x, pointer.y]);
            line.clean();
            line.draw(json.path);
            console.log("push : ", pointer.x, " ", pointer.y);
        }else{
            console.log("Clic désactivé (appuyer sur A pour activer");
        }

    });
} 