function gaKeys = qdfrftQcTrain()

options = optimoptions('ga', 'PopulationSize', 10, 'Generations', 10);
gaKeys = ga(@fitness, 18, [], [], [], [], 0, 10, [], options);

end