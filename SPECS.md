QUERY LANGUAGE
==============


OBJECT REPRESENTATION
=====================


```
{
    action:   See #ACTIONS,
    criteria: See #CRITERIA,
    values:   See #VALUES,
    sort:     See #SORTING,
    offset:   See #OFFSET,
    limit:    See #LIMIT
}

```

ACTIONS
======

 * Create  [  "CREATE"]
 * Find    [    "FIND"]
 * FindOne ["FIND_ONE"]
 * Update  [  "UPDATE"]
 * Destroy [ "DESTROY"]


CRITERIA
========

 * Strict Equality:
```
{
    fieldName: VALUE
}
```

 * AND operator:
```
{
    fieldName1: VALUE,
    fieldName2: VALUE
}
```


VALUES
======

```
{
    fieldName1: VALUE,
    fieldName2: VALUE,
    fieldName3: VALUE
}
```

SORTING
=======

 * Ascending  [ 1]
 * Descending [-1]


```
[
    [ fieldName1,  1 ],
    [ fieldName2, -1 ],
    [ fieldName3, -1 ]
]

```

OFFSET
======

```
Number
```


LIMIT
=====

```
Number
```

RETURN
======


