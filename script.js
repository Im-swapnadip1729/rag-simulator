 // Sample Text
        const SOURCE_TEXT = "Large Language Models (LLMs) are revolutionary, but they often hallucinate or lack access to real-time, private data. Retrieval-Augmented Generation (RAG) solves this by fetching relevant documents from a vector database to ground the model's response in factual evidence. This architecture involves splitting documents into smaller chunks, generating embeddings, and storing them for retrieval. Selecting the right chunking strategy is critical, as it determines the granularity of information provided to the LLM during inference. If chunks are too small, the LLM loses vital surrounding context. If chunks are too large, the retrieval system struggles to find specific needle-in-a-haystack answers, and the LLM context window gets clogged with irrelevant noise.";
        const words = SOURCE_TEXT.split(/\s+/);

        // DOM Elements
        const chunkSlider = document.getElementById('chunk-size');
        const chunkValDisplay = document.getElementById('chunk-size-val');
        const overlapSlider = document.getElementById('overlap-size');
        const overlapValDisplay = document.getElementById('overlap-size-val');
        const chunksContainer = document.getElementById('chunks-container');
        const totalChunksDisplay = document.getElementById('total-chunks-val');

        // Colors for alternating chunk borders
        const chunkColors = [
            'border-blue-300 bg-blue-50',
            'border-indigo-300 bg-indigo-50',
            'border-purple-300 bg-purple-50',
            'border-pink-300 bg-pink-50',
            'border-teal-300 bg-teal-50'
        ];

        function renderChunks() {
            let chunkSize = parseInt(chunkSlider.value);
            let overlapSize = parseInt(overlapSlider.value);

            // Safety: Overlap cannot be greater than or equal to chunk size
            if (overlapSize >= chunkSize) {
                overlapSize = chunkSize - 1;
                overlapSlider.value = overlapSize;
            }
            
            chunkValDisplay.textContent = chunkSize;
            overlapValDisplay.textContent = overlapSize;

            chunksContainer.innerHTML = ''; // Clear previous

            const effectiveStep = chunkSize - overlapSize;
            const chunks = [];

            // Chunking algorithm
            for (let i = 0; i < words.length; i += effectiveStep) {
                chunks.push({
                    words: words.slice(i, i + chunkSize),
                    startIndex: i
                });
                if (i + chunkSize >= words.length) break;
            }

            totalChunksDisplay.textContent = chunks.length;

            chunks.forEach((chunk, index) => {
                const colorClass = chunkColors[index % chunkColors.length];
                
                const card = document.createElement('div');
                card.className = `chunk-card p-4 rounded-xl border-2 ${colorClass} shadow-sm`;

                // Header for card
                const header = document.createElement('div');
                header.className = 'flex justify-between items-center mb-3 border-b border-black/10 pb-2';
                
                const title = document.createElement('div');
                title.className = 'text-xs font-bold uppercase tracking-wider text-slate-700';
                title.textContent = `Chunk ${index + 1} (Words: ${chunk.startIndex} - ${chunk.startIndex + chunk.words.length - 1})`;
                header.appendChild(title);

                // Semantic break check (does it end with punctuation?)
                const lastWord = chunk.words[chunk.words.length - 1] || "";
                const hasPunctuation = /[.!?]$/.test(lastWord);
                const isLastChunk = (chunk.startIndex + chunk.words.length) >= words.length;

                if (!hasPunctuation && !isLastChunk) {
                    const warning = document.createElement('div');
                    warning.className = 'text-[10px] font-bold px-2 py-1 bg-red-100 text-red-700 border border-red-200 rounded';
                    warning.textContent = 'Semantic Break';
                    header.appendChild(warning);
                }

                card.appendChild(header);

                // Text body
                const textBody = document.createElement('div');
                textBody.className = 'text-sm text-slate-800 leading-relaxed';

                chunk.words.forEach((word, wIdx) => {
                    const span = document.createElement('span');
                    span.textContent = word + ' ';
                    
                    // Highlight overlaps (if not the first chunk, and word index is < overlapSize)
                    if (index > 0 && wIdx < overlapSize) {
                        span.className = 'overlap-highlight px-0.5 rounded-sm mx-0.5';
                    }
                    
                    textBody.appendChild(span);
                });

                card.appendChild(textBody);
                chunksContainer.appendChild(card);
            });
        }

        // Event Listeners
        chunkSlider.addEventListener('input', renderChunks);
        overlapSlider.addEventListener('input', renderChunks);

        // Initial Render
        renderChunks();