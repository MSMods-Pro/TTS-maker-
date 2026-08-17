import fs from 'fs';

let content = fs.readFileSync('src/App.tsx', 'utf-8');

// We have this malformed block:
//                              <div className="text-xs text-neutral-400 font-medium">
//                                {v.gender === 'male' ? 'Male' : 'Female'} • {v.character || 'Clear • Standard'}
//                              </div>
//                                </div>
//                              )}
//                            </div>
//                          ))}
// We need to change it to:
//                              <div className="text-xs text-neutral-400 font-medium">
//                                {v.gender === 'male' ? 'Male' : 'Female'} • {v.character || 'Clear • Standard'}
//                              </div>
//                            </div>
//                          ))}

const badBlock = `<div className="text-xs text-neutral-400 font-medium">
                                {v.gender === 'male' ? 'Male' : 'Female'} • {v.character || 'Clear • Standard'}
                              </div>
                                </div>
                              )}
                            </div>
                          ))}
                        </div>`;

const goodBlock = `<div className="text-xs text-neutral-400 font-medium">
                                {v.gender === 'male' ? 'Male' : 'Female'} • {v.character || 'Clear • Standard'}
                              </div>
                            </div>
                          ))}
                        </div>`;

// Replace ignoring whitespace
const noSpace = (s) => s.replace(/\s+/g, '');
const contentNoSpace = content.replace(/\s+/g, '');
// To be safe, let's just do a string replace or a targeted replace.

content = content.replace(
  /\{\s*v\.gender === 'male' \? 'Male' : 'Female'\}\s*•\s*\{v\.character \|\| 'Clear • Standard'\}\s*<\/div>\s*<\/div>\s*\)\}\s*<\/div>\s*\)\)\}\s*<\/div>/,
  `{v.gender === 'male' ? 'Male' : 'Female'} • {v.character || 'Clear • Standard'}
                              </div>
                            </div>
                          ))}
                        </div>`
);

fs.writeFileSync('src/App.tsx', content);
console.log('App.tsx fixed');
