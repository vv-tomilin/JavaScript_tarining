# Поиск наибольшего контейнера с водой

На вход нам подается массив с числами. Каждое число представляет собой вертикальную линию заданной высоты. Все линии находятся друг от друга на расстоянии 1. Нам необходимо найти такие 2 линии (2 числа) из этого массива, которые, образуя "контейнер", дадут максимально возможное количество воды. В качестве ответа необходимо вернуть максимальный  "объем"  воды для данного массива с числами. 

Для решения данной задачи мы будем использовать популярный алгоритм с двумя указателями (two pointers).

Длина массива от 2 до 100 000. А значения в массиве могут быть от 0 до 10 000. 
По условию это все. 

Cложность получившегося алгоритма с двумя указателями по времени у нас линейная O(n), а сложность по памяти — константа O(1).