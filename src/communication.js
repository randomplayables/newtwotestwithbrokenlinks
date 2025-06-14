
                        window.GAMELAB_SESSION_ID = "a051204b-ea8b-4a89-8271-c691e80341b4";
                        window.GAMELAB_GAME_ID = "1749869967254";

                        window.sendDataToGameLab = function(data) {
                            console.log('Game (in Sandpack) sending data to GameLab:', data);
                            const payloadWithSession = { 
                                ...data, 
                                sessionId: window.GAMELAB_SESSION_ID,
                                gameId: window.GAMELAB_GAME_ID 
                            };
                            window.parent.postMessage({ type: 'GAMELAB_DATA', payload: payloadWithSession }, '*');
                        };

                        window.onerror = function(message, source, lineno, colno, error) {
                          let M = message, S = source, L = lineno, C = colno;
                          let ST = error && typeof error.stack === 'string' ? error.stack : (typeof error === 'string' ? error : undefined);
                  
                          if (error) {
                            if (typeof error === 'object' && error !== null) { M = String(error.message || M); } 
                            else if (typeof error === 'string') { M = error; }
                          }
                  
                          const errorPayload = {
                            message: String(M || "Unknown error from iframe"), source: String(S || "Unknown source"),
                            lineno: L ? Number(L) : undefined, colno: C ? Number(C) : undefined, stack: ST
                          };
                          console.error('GameLab error (in iframe caught by window.onerror):', errorPayload);
                          window.parent.postMessage({ type: 'GAMELAB_ERROR', payload: errorPayload }, '*');
                          return true;
                        };
                    