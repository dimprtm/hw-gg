import React from 'react';

const SearchBox = (props) => {
	return (
        <form action="" onSubmit={props.getTracks}>
			<input
                type='text'
				className=''
				value={props.keyword}
				onChange={(e) => props.setKeyword(e.target.value)}
				placeholder='Search tracks...'
			/>
            <button type={"submit"}>Search</button>
        </form>
	);
};

export default SearchBox;