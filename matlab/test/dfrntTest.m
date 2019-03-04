source = [1, 2, 3, 4];
p = rand(4, 4);

output = dfrnt(source, 0.25, 1, p);
output4 = dfrnt(output, 0.25, 1, p);
output4 = dfrnt(output4, 0.25, 1, p);
output4 = dfrnt(output4, 0.25, 1, p);