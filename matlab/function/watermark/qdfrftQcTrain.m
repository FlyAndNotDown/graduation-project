function gaKeys = qdfrftQcTrain()

options = optimoptions('ga', 'PopulationSize', 20, 'EliteCount', 0.01, 'CrossoverFraction', 0.6, 'Generations', 50);
gaKeys = ga(@fitness, 18, [], [], [], [], 0, 10, [], options);

end