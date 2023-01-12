<?php
include('includes/header.inc.php');
?>
<br>
<br>
<br>
<br>
    
    <div class="container">
        <div class="row">
            <div class="col-12">
                <div class="input-group mb-3">
                    <input type="text" class="form-control" placeholder="Rechercher un mot" aria-label="Rechercher un mot" id ="search-input" aria-describedby="button-addon2" onkeydown="searchWord(document.getElementById('search-input').value)">
                    <button class="btn btn-outline-secondary" type="button" id="button-addon2" onclick="searchWord(document.getElementById('search-input').value)">
                        Rechercher
                    </button>
                </div>
            </div>
        </div>
    </div>
    <div class="container">
        <ul class="list-group" id="list">
        </ul>

    </div>



        <script>
    function searchWord(data) {
        // data to upper case
        data = data.toUpperCase();



        console.log(data);
        // Charger les données du dictionnaire à partir du fichier JSON

        $.getJSON("server/data/dico_fr.json", function(data) {
            var words = data.slice(0,200).map(function(entry) { return entry.title });

        // Écouter les entrées de l'utilisateur dans la barre de recherche
        $("#search-input").on("keyup", function() {
            var searchValue = $(this).val();

            // Filtrer les mots en fonction du pattern de recherche
            var filteredWords = words.filter(function(word) {
            return word.startsWith(searchValue);
            });

            // Afficher les mots filtrés dans la liste
            var wordList = $("#list");
            wordList.empty();
            filteredWords.forEach(function(word) {
                console.log(word);
            var wordItem = $("<li>").addClass("list-group-item").text(word);
            wordList.append(wordItem);
            });
        });
        });
    }

</script>

<?php
include('includes/footer.inc.php');
?>

 