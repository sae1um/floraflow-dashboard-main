export default function filterAndSortGhList(greenhouses, filterStatus, searchQuery, sortBy, sortOrder) {
    return greenhouses
        .filter((greenhouse) => {
            const query = searchQuery.toLowerCase();
            // Matched based on search input
            const matchesSearch =
                greenhouse.name.toLowerCase().includes(query) ||
                greenhouse.location.toLowerCase().includes(query) ||
                greenhouse.building.toLowerCase().includes(query);
            const matchStatus =
                filterStatus === "all" || greenhouse.status === filterStatus;
            return matchesSearch && matchStatus;
        })
        .sort((a, b) => {
            //Values to compare in gh list
            //Sorts by input sort value
            let aValue = a[sortBy];
            let bValue = b[sortBy];

            if (typeof aValue === "string") {
                aValue = aValue.toLowerCase();
                bValue = bValue.toLowerCase();
            }

            if (aValue === bValue) return 0; //both same value

            if (sortOrder === "asc") {
                // If ascending and a < b then -1 (a first)
                return aValue < bValue ? -1 : 1;
            } else {
                // If descending and a > b then -1 (a first)
                return aValue > bValue ? -1 : 1;
            }
        });
}
