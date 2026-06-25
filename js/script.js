let botao = document.getElementById("buscar");

botao.addEventListener("click", async () => {

    let tema =
        document.getElementById("pesquisa").value;

    let resultados =
        document.getElementById("resultados");

    resultados.innerHTML =
        "<p>Buscando artigos...</p>";

    try {



        let tema = document
            .getElementById("pesquisa")
            .value;

        let termoMercadoCapitais =
            "capital market OR stock market OR equity market";

        let pesquisaFinal =
            `(${termoMercadoCapitais}) ${tema}`;    

        let resposta = await fetch(
            `https://api.openalex.org/works?search=${encodeURIComponent(pesquisaFinal)}&per_page=10`
        );

        let dados = await resposta.json();

        dados.results.sort((a, b) => {

            let anoA = a.publication_year || 0;
            let anoB = b.publication_year || 0;

            return anoB - anoA;

        });

        resultados.innerHTML = "";

        dados.results.forEach(artigo => {

            let titulo =
                artigo.display_name || "Sem título";

            let ano =
                artigo.publication_year || "-";

            let doi =
                artigo.doi || "";

            let pdf =
                artigo.open_access?.oa_url || "";

            let card = `

            <div class="artigo">

                <h3>${titulo}</h3>

                <p>
                    <strong>Ano:</strong>
                    ${ano}
                </p>

            `;

            if (doi) {

                card += `
                    <a
                        href="${doi}"
                        target="_blank"
                        class="btn-artigo">
                        Abrir Artigo
                    </a>
                `;
            }

            if (pdf) {

                card += `
                    <a
                        href="${pdf}"
                        target="_blank"
                        class="btn-pdf">
                        Ver PDF
                    </a>
                `;
            }

            card += `</div>`;

            resultados.innerHTML += card;

        });

    } catch {

        resultados.innerHTML =
            "<p>Erro ao buscar artigos.</p>";

    }

});