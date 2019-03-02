function result = dfrnt2(source, r)

[sourceRows, sourceCols] = size(source);

result = source;

for n = 1 : sourceRows
    result(n,:) = dfrnt(result(n,:)', r)';
end

for n = 1 : sourceCols
    result(:,n) = dfrnt(result(:,n), r);
end

end